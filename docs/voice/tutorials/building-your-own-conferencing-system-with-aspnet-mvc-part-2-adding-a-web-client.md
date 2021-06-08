---
title: >-
  Build Your Own Conferencing System With ASP.NET MVC - Part 2
description: >-
  If you followed the first tutorial we build on that one and we will look at
  building a web based client to connect users to a conference.
redirectFrom:
  - /docs/building-your-own-conferencing-system-with-aspnet-mvc-part-2-adding-a-web-client
---

# Build your own conferencing system with ASP.NET MVC - Part 2

In [part 1](building-your-own-conferencing-system-with-aspnet-mvc-part-1-getting-started.md), we built the foundation for our conference calling system, and in this part of the tutorial, we will look at building a web based client to connect users to a conference.

All of the source code is available on [GitHub here](https://github.com/sinch/net-demo.sinch.com).

The process for connecting to a web browser is a bit different since you don’t need to call a number to connect. With this in mind, our UI will consist of asking for a name or email and a PIN number to join the conference call. Then we will look up the PIN and connect the user to that conference and set the caller ID to name the supplied.

## Using The System

You can either deploy this project straight to Azure and it will set up a database and configure Sinch app keys and secrets for you. Or you can just fork it and deploy wherever you want.

### Running on your own server

1. IIS
2. SQL server
3. .NET 4.5

## A Short Recap

Of _Controllers/CallbackController.cs_

If you remember from part 1 we had the `Controllers/CallbackController.cs`, and on the **MXP** row we set the caller ID which connects to the conference.

```csharp
public async Task<SvamletModel> Post(CallbackEventModel model) {
    var sinch = SinchFactory.CreateCallbackResponseFactory(Locale.EnUs);
    var reader = sinch.CreateEventReader();
    var evt = reader.ReadModel(model);
    var builder = sinch.CreateIceSvamletBuilder();
    switch (evt.Event) {
        case Event.IncomingCall:
            if (model.OriginationType == "MXP") {
                //Its a browser calling in, just look up the PIN code
                await ConnectToConference(model.To.Endpoint, model.From, builder);
            } else { // A phone is calling in, play a promopt
                builder.AddNumberInputMenu("menu1", "Enter 4 digit pin", 4, "Enter 4 digit pin", 3,
                    TimeSpan.FromSeconds(60));
                builder.RunMenu("menu1");
            }
            break;
        case Event.PromptInput:
            // Only regular phones will come here
            await ConnectToConference(model.MenuResult.Value, model.From, builder);
            break;
        case Event.AnsweredCall:
            // Since we cant opt out from callbacks because of the prompts,
            //we need to respond to Answered call as well.
            builder.Continue();
            break;
        case Event.DisconnectedCall:
        // This would be a good place to notify
        //other people in the conf that some one left
            break;
        default:
            break;
    }
    return builder.Build().Model;
}

private async Task ConnectToConference(string  pinCode, string cli, IIceSvamletBuilder builder) {
    using (var db = new ConferenceContext()) {
        // find the correct conference (current setup only allows for 10 000 unique
        // conferences per day, because I wanted to limit the pin code length to 4)
        var conference =
            await db.Conferences
            .FirstOrDefaultAsync(c => c.PinCode == pinCode
            && (c.ConferenceEndDate >= DateTime.Today || c.ValidForever== true));

        if (conference != null) {
            // connect the caller to the conrefence with the correct CLI
            builder.ConnectConference(conference.ConferenceId.ToString()).WithCli(cli);
            builder.Say(", Welcome to the conference");
        } else {
            builder.Say("Invalid code").Hangup(HangupCause.Normal);
        }
    }
}
```

## Creating The UI

For this website I found a wonderful bootstrap theme called **Material** that's based on Googles Material design. It has a nice colour scheme and some built in visual effects for inputs and buttons. Check it out at [here](http://fezvrasta.github.io/bootstrap-material-design/).

**JoinConference.cshtml**

```html
//code removed for clarity, check github for full code
<form id="newCall" class="form-horizontal" autocomplete="off">
  <div class="form-group-material-deep-purple-300">
    <input
      type="text"
      class="form-control floating-label input-lg "
      id="userName"
      name="userName"
      placeholder="E-mail or name"
      data-placement="right"
      title="Email or name"
    /><br />
    <input
      type="text"
      class="form-control floating-label input-lg"
      id="pinCode"
      name="pinCode"
      placeholder="Conference pin:"
    /><br />
  </div>
  <div class="clearfix"></div>
  <div class="form-group text-center">
    <button class="btn btn-material-deep-purple-400 btn-raised" id="call">
      Join conference
    </button>
    <div class="text-danger" id="errormessage"></div>
    <div class="lead">Or call (415) 854-4909 to join.<br /></div>
    <a href="" data-toggle="modal" data-target="#complete-dialog"
      >more numbers</a
    >
  </div>
</form>
<audio id="incoming" autoplay></audio>
<audio id="ringback" src="~/content/ringback.wav" loop></audio>
<audio id="ringtone" src="~/content/phone_ring.wav" loop></audio>
```

The next thing to do is to start a Sinch client when the user enters their name and a PIN. Since I don’t want to have the secret in my JavaScript, I created an endpoint to Sign a user ticket on the **ConferenceController**. You can read more about ticket generation in the [Sinch documentation](../../../voice/js-cloud/voice-js-authentication).

**ConferenceController.cs**

```csharp
public JsonResult GetTicket(string id) {
    var loginObject = new LoginObject(appKey, appSecret);
    loginObject.userTicket = loginObject.Signature(id);

    return Json(loginObject, JsonRequestBehavior.AllowGet);
}
```

As you can see, I created a login object, which creates a base64 string out of a UserTicket and then hashes that with the application secret and returns it to the client.

```csharp
public class LoginObject {
    private readonly string _key;
    private readonly string _secret;

    public LoginObject(string key, string secret) {
        _key = key;
        _secret = secret;
    }

    [JsonProperty("userTicket")]
    public string userTicket { get; set; }

    public string Signature(string userId) {
        var userTicket = new UserTicket();
        userTicket.Identity = new Identity {Type = "username", Endpoint = userId};
        userTicket.ApplicationKey = _key;
        userTicket.Created = DateTime.UtcNow.ToString("O", CultureInfo.InvariantCulture);
        userTicket.ExpiresIn = 3600;
        Debug.WriteLine(DateTime.UtcNow.ToString("O", CultureInfo.InvariantCulture));
        var json = JsonConvert.SerializeObject(userTicket).Replace(" ", "");
        var ticketData = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));
        var sha256 = new HMACSHA256(Convert.FromBase64String(_secret));
        var signature = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(json)));
        Debug.WriteLine(json);
        return ticketData + ":" + signature;
    }
}

public class UserTicket {
    [JsonProperty("identity")]
    public Identity Identity { get; set; }

    [JsonProperty("applicationkey")]
    public string ApplicationKey { get; set; }

    [JsonProperty("created")]
    public string Created { get; set; }

    [JsonProperty("expiresIn")]
    public int ExpiresIn { get; set; }
}

public class Identity {
    [JsonProperty("type")]
    public string Type { get; set; }

    [JsonProperty("endpoint")]
    public string Endpoint { get; set; }
}
```

Now that we've this, it’s time to implement the JavaScript. In the code below we perform the following actions:

1. Add the Sinch SDK

   ```html
   <script src="~/Scripts/sinch.min.js"></script>
   ```

2. Start initiate the client

   ```javascript
   var sinchClient = new SinchClient({
     applicationKey: "@ViewBag.applicationKey",
     capabilities: { calling: true },
     startActiveConnection: false, //we dont need to receive calls
     onLogMessage: function (message) {
       console.log(message);
     },
   });
   ```

3. Define call listeners and callClient that we use to connect to the conference

   ```javascript
   var callClient = sinchClient.getCallClient();
   var call;
   var started = false;
   var connectionId;
   var muted = false;
   var callListeners = {
     onCallProgressing: function (call) {
       $("audio#ringback").prop("currentTime", 0);
       $("audio#ringback").trigger("play");
       $("div#callLog").prepend('<div id="stats">Ringing...</div>');
     },
     onCallEstablished: function (call) {
       timer();
       $("audio#incoming").attr("src", call.incomingStreamURL);
       $("audio#ringback").trigger("pause");
       $("audio#ringtone").trigger("pause");
       var callDetails = call.getDetails();
       $("div#callLog").prepend(
         '<div id="stats">Answered at: ' +
           callDetails.establishedTime +
           "</div>"
       );
     },
     onCallEnded: function (call) {
       $("audio#ringback").trigger("pause");
       $("audio#ringtone").trigger("pause");
       $("audio#incoming").attr("src", "");
       showUI(false);
       //Report call stats
       var callDetails = call.getDetails();
       $("div#callLog").prepend(
         '<div id="stats">Ended: ' + callDetails.endedTime + "</div>"
       );
       $("div#callLog").prepend(
         '<div id="stats">Duration (s): ' + callDetails.duration + "</div>"
       );
       $("div#callLog").prepend(
         '<div id="stats">End cause: ' + call.getEndCause() + "</div>"
       );
       $("#timer").html("00:00:00");
       seconds = 0;
       minutes = 0;
       hours = 0;
       if (call.error) {
         $("div#callLog").prepend(
           '<div id="stats">Failure message: ' + call.error.message + "</div>"
         );
         $("#errormessage").html(call.error.message);
         showUI(false);
       }
     },
   };
   ```

4. Hook up the call button buttons

   ```javascript
   function joinConference() {
     $("div#callLog").prepend(
       '<div id="title">Joining conference ' + $("#pinCode").val() + "</div>"
     );
     call = callClient.callConference($("#pinCode").val());
     call.addEventListener(callListeners);
   }

   $("button#call").click(function (event) {
     event.preventDefault();
     //basic error handling
     if ($("#userName").val() === "" || $("#pinCode").val() === "") {
       $("#errormessage").html(
         "you must enter a name and pin code that you received in the email"
       );
       return;
     }
     $("#errormessage").html("");
     //play local file while we start the client (might take a second or two
     $("audio#ringback").trigger("play");
     showUI(true); //Switch to In call UI (more on that later)
     //Check to see if the client is started, if it's just join the conference
     if (!started) {
       //Get the ticket
       $.getJSON("getTicket", { id: $("#userName").val() }, function (ticket) {
         sinchClient.start(ticket).then(function () {
           started = true;
           joinConference(); //Join the conference
         });
       });
     } else {
       joinConference();
     }
   });
   ```

## Adding UI

That’s really all there is to it to join the conference. Now we need to add some extra UI functionality and we need to be able to hang-up and mute the mic, and add a timer.

```html
<div id="incall" style="display: none">
  <div class="col-md-12">
    <div class="lead text-center" id="timer">00:00:00</div>
  </div>
  <div class="row text-center">
    <div class="col-md-2"></div>
    <div class="col-md-2 text-center">
      <button id="hangup" class="btn btn-fab btn-raised btn-material-red">
        <i class="mdi-communication-call-end"></i>
      </button>
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-2">
      <button id="mute" class="btn btn-fab btn-raised btn-material-grey">
        <i id="micicon" class="mdi-av-mic"></i>
      </button>
    </div>
    <div class="col-md-2"></div>
  </div>
</div>
```

Let’s start with the ShowUI function. It basically switches between join conference and in-call nothing strange. My designer provided me with some background images as well so I am switching between them with a nice animation.

```javascript
function showUI(incall) {
  if (incall) {
    $("#newCall").hide();
    $("#incall").show();
    $("#bg").removeClass();
    $("#bg").addClass("bg incallBg");
  } else {
    $("#newCall").show();
    $("#incall").hide();
    $("#bg").removeClass();
    $("#bg").addClass("bg loginBg");
  }
}
```

With that out of the way, we need to implement hang-up and mute functions. The important thing to remember here is that you need to keep a reference to your call in the page. Again I am using some of the awesome icons from the Material CSS to switch between an enabled and disabled mic.

```javascript
//mute
$("#mute").bind("click", function (event) {
  if (muted) {
    $("#micicon").removeClass();
    $("#micicon").addClass("mdi-av-mic");
    call.unmute();
    muted = false;
  } else {
    $("#micicon").removeClass();
    $("#micicon").addClass("mdi-av-mic-off");
    call.mute();
    muted = true;
  }
});

/*** Hang up a call ***/
$("button#hangup").click(function (event) {
  event.preventDefault();
  call.hangup();
});
```

The hang-up is also pretty straight forward. Just call hang-up, which will trigger the **callDidend** method and reset the UI to its former glory.

The complete **JoinConference.cshml** looks like this.

```html
@model dynamic @{ ViewBag.Title = "Connect to a Conference Call | Sinch
Conference Calling"; ViewBag.Description = "Connect to a Sinch Conference Call.
Join via the app or call in from your own phone."; }
<div id="bg" class="bg loginBg"></div>
<div class="row">
  <div class="well well-lg sinch-vertical-center">
    <h2>Join a conference</h2>
    <p>Enter your name and the PIN you got in your invitation</p>
    <form id="newCall" class="form-horizontal" autocomplete="off">
      <div class="form-group-material-deep-purple-300">
        <input
          type="text"
          class="form-control floating-label input-lg "
          id="userName"
          name="userName"
          placeholder="E-mail or name"
          data-placement="right"
          title="Email or name"
        /><br />
        <input
          type="text"
          class="form-control floating-label input-lg"
          id="pinCode"
          name="pinCode"
          placeholder="Conference pin:"
        /><br />
      </div>

      <div id="participants"></div>
      <div class="clearfix"></div>
      <div class="form-group text-center">
        <button class="btn btn-material-deep-purple-400 btn-raised" id="call">
          Join conference
        </button>
        <div class="text-danger" id="errormessage"></div>
        <div class="lead">Or call (415) 854-4909 to join.<br /></div>
        <a href="" data-toggle="modal" data-target="#complete-dialog"
          >more numbers</a
        >
      </div>
    </form>

    <div id="incall" style="display: none">
      <div class="col-md-12">
        <div class="lead text-center" id="timer">00:00:00</div>
      </div>
      <div class="row text-center">
        <div class="col-md-2"></div>
        <div class="col-md-2 text-center">
          <button id="hangup" class="btn btn-fab btn-raised btn-material-red">
            <i class="mdi-communication-call-end"></i>
          </button>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <button id="mute" class="btn btn-fab btn-raised btn-material-grey">
            <i id="micicon" class="mdi-av-mic"></i>
          </button>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
    <audio id="incoming" autoplay></audio>
    <audio id="ringback" src="~/content/ringback.wav" loop></audio>
    <audio id="ringtone" src="~/content/phone_ring.wav" loop></audio>
  </div>
</div>

<div class="row">
  <button
    class="btn btn-primary"
    type="button"
    data-toggle="collapse"
    data-target="#logContainer"
    aria-expanded="false"
    aria-controls="logContainer"
    style="bottom: 0px; position: absolute;"
  >
    Show Log
  </button>
  <div class="collapse" id="logContainer">
    <div
      class="col-md-10 well well-lg"
      style="bottom: 50px; height: 100px; overflow-x: hidden; overflow-y: auto; position: absolute;"
    >
      <div id="callLog"></div>
    </div>
  </div>
</div>
<div id="complete-dialog" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
        <h4 class="modal-title">Conference numbers</h4>
      </div>
      <div class="modal-body">
        <p>
          Sweden: 010 100 99 14<br />
          Florida: (786) 408 8194
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-dismiss="modal">Dismiss</button>
      </div>
    </div>
  </div>
</div>

@section scripts {

<script src="~/Scripts/sinch.min.js"></script>
<script>
  $('[data-toggle="tooltip"]').tooltip();
  var sinchClient = new SinchClient({
    applicationKey: "@ViewBag.applicationKey",
    capabilities: { calling: true },
    startActiveConnection: false, //we dont need to receive calls
    onLogMessage: function (message) {
      console.log(message);
    },
  });
  var callClient = sinchClient.getCallClient();
  var call;
  var started = false;
  var connectionId;
  var muted = false;
  var callListeners = {
    onCallProgressing: function (call) {
      $("audio#ringback").prop("currentTime", 0);
      $("audio#ringback").trigger("play");
      $("div#callLog").prepend('<div id="stats">Ringing...</div>');
    },
    onCallEstablished: function (call) {
      timer();
      $("audio#incoming").attr("src", call.incomingStreamURL);
      $("audio#ringback").trigger("pause");
      $("audio#ringtone").trigger("pause");
      showUI(true);
      //Report call stats
      var callDetails = call.getDetails();
      $("div#callLog").prepend(
        '<div id="stats">Answered at: ' + callDetails.establishedTime + "</div>"
      );
    },
    onCallEnded: function (call) {
      $("audio#ringback").trigger("pause");
      $("audio#ringtone").trigger("pause");
      $("audio#incoming").attr("src", "");
      showUI(false);
      //Report call stats
      var callDetails = call.getDetails();
      $("div#callLog").prepend(
        '<div id="stats">Ended: ' + callDetails.endedTime + "</div>"
      );
      $("div#callLog").prepend(
        '<div id="stats">Duration (s): ' + callDetails.duration + "</div>"
      );
      $("div#callLog").prepend(
        '<div id="stats">End cause: ' + call.getEndCause() + "</div>"
      );
      $("#timer").html("00:00:00");
      seconds = 0;
      minutes = 0;
      hours = 0;
      if (call.error) {
        $("div#callLog").prepend(
          '<div id="stats">Failure message: ' + call.error.message + "</div>"
        );
        $("#errormessage").html(call.error.message);
        showUI(false);
      }
    },
  };
  $("button#call").click(function (event) {
    event.preventDefault();
    if ($("#userName").val() === "" || $("#pinCode").val() === "") {
      $("#errormessage").html(
        "you must enter a name and pin code that you received in the email"
      );
      return;
    }
    $("#errormessage").html("");
    $("audio#ringback").trigger("play");

    showUI(true);
    if (!started) {
      $.getJSON("getTicket", { id: $("#userName").val() }, function (ticket) {
        sinchClient.start(ticket).then(function () {
          started = true;
          joinConference();
        });
      });
    } else {
      joinConference();
    }
  });

  function joinConference() {
    $("div#callLog").prepend(
      '<div id="title">Joining conference ' + $("#pinCode").val() + "</div>"
    );
    call = callClient.callConference($("#pinCode").val());
    call.addEventListener(callListeners);
  }

  //mute
  $("#mute").bind("click", function (event) {
    if (muted) {
      $("#micicon").removeClass();
      $("#micicon").addClass("mdi-av-mic");
      call.unmute();
      muted = false;
    } else {
      $("#micicon").removeClass();
      $("#micicon").addClass("mdi-av-mic-off");
      call.mute();
      muted = true;
    }
  });

  /*** Hang up a call ***/
  $("button#hangup").click(function (event) {
    event.preventDefault();
    call.hangup();
  });
  var seconds = 0,
    minutes = 0,
    hours = 0,
    t;
  $("#incall").hide();

  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    var time =
      (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
    $("#timer").html(time);
    timer();
  }

  function timer() {
    t = setTimeout(add, 1000);
  }

  function showUI(incall) {
    if (incall) {
      $("#newCall").hide();
      $("#incall").show();
      $("#bg").removeClass();
      $("#bg").addClass("bg incallBg");
    } else {
      $("#newCall").show();
      $("#incall").hide();
      $("#bg").removeClass();
      $("#bg").addClass("bg loginBg");
    }
  }
  $("button").prop("disabled", false); //Solve Firefox issue, ensure buttons always clickable after load
</script>

}
```

## Finished

That’s all. Now we've a fully working web client to work with our backend service to make conference calls.

## More Resources

If you liked this tutorial, you might also like the following:

- [Building a Conference Calling System in C# (a different version)](build-your-own-conference-calling-system-in-c.md)
