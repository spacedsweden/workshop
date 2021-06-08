---
title: Turn Your Browser Into a Phone With the Sinch JS SDK
excerpt: >-
  A step-by-step walk through on how to build a web app to make VoIP calls
  between browsers using JavaScript. Read more.
---

The UI isn’t anything to write home about, but the finished web app will looking something like this:
![overview.png](images\350da25-overview.png)

The finished code for this tutorial can be found on [our Github](https://github.com/sinch/js-web-calling).

## Setup

* If you don’t have a Sinch developer account, sign up and register a new app [here](https://portal.sinch.com/#/signup)
* Download the SDK from [here](https://download.sinch.com/js/1.4.11/Sinch-javascript-1.4.11-863cac2.zip)
* Create an index.html file with references to jQuery and the Sinch JavaScript SDK:

```html
<head>
  <title>Sinch Web Calling</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="sinch.min.js"></script>
</head>
```

## Create the UI

There are two parts to the UI for this app: a login form and a call screen. Users will first see the login screen and after successfully logging in, they will see the call screen:

```html
<form id="auth">
  <input id="username" placeholder="username" />
  <input id="password" type="password" placeholder="password" />
  <button id="loginUser">Login</button>
  <button id="createUser">Signup</button>
</form>

<div id="call" style="display:none;">
  current user: <span id="username"></span>
  <button id="logout">Logout</button>

  <form>
    <input id="callUsername" placeholder="username" /><br />
    <button id="call">Call</button>
    <button id="hangup">Hangup</button>
    <button id="answer">Answer</button>

    <audio id="incoming" autoplay></audio>
    <div id="callLog"></div>
  </form>
</div>
```

Lastly, a div at the bottom of the page to display any errors that might occur:

`<div class="error"></div>`

## Login and user registration

This section will demonstrate how to log in and register users using the Sinch SDK. For this tutorial, you will use a very basic backend for user management to get started. You shouldn't use this in a production environment. In production, you should use your own user authentication. You can find a [.net sample project here](https://github.com/sinch/net-backend-sample).

First, create an instance of the Sinch client:

```javascript
sinchClient = new SinchClient({
  applicationKey: "your-app-key",
  capabilities: { calling: true },
});
```

Then, either create or log in the user and start the Sinch client:

```javascript
//store the username of the current user
var global_username = "";

$("button#createUser").on("click", function (event) {
  event.preventDefault();
  $("button#createUser").attr("disabled", true);
  $("button#loginUser").attr("disabled", true);
  clearError();

  var username = $("input#username").val();
  var password = $("input#password").val();

  var loginObject = { username: username, password: password };
  sinchClient
    .newUser(loginObject, function (ticket) {
      sinchClient
        .start(ticket, function () {
          global_username = username;
          showCall();
        })
        .fail(handleError);
    })
    .fail(handleError);
});

$("button#loginUser").on("click", function (event) {
  event.preventDefault();
  $("button#createUser").attr("disabled", true);
  $("button#loginUser").attr("disabled", true);
  clearError();

  var username = $("input#username").val();
  var password = $("input#password").val();

  var loginObject = { username: username, password: password };
  sinchClient
    .start(loginObject, function () {
      global_username = username;
      showCall();
    })
    .fail(handleError);
});

//handle errors
var handleError = function (error) {
  $("button#createUser").attr("disabled", false);
  $("button#loginUser").attr("disabled", false);
  $("div.error").text(error.message);
};

//clear out old errors
var clearError = function () {
  $("div.error").text("");
};

//show the call screen
var showCall = function () {
  $("form#auth").css("display", "none");
  $("div#call").show();
  $("span#username").append(global_username);
};
```

## Make outgoing calls

Once a user is authenticated, you will use the Sinch call client to make outgoing calls. First, define a custom call listener. This lets you make decisions based on whether a call is ringing, connected or ended:

```javascript
var callListener = {
  onCallProgressing: function (call) {
    $("div#callLog").append("<div>Ringing...</div>");
  },
  onCallEstablished: function (call) {
    $("audio#incoming").attr("src", call.incomingStreamURL);
    $("div#callLog").append("<div>Call answered</div>");
  },
  onCallEnded: function (call) {
    $("audio#incoming").removeAttr("src");
    $("button#call").removeAttr("disabled");
    $("button#answer").removeAttr("disabled");
    $("div#callLog").append("<div>Call ended</div>");
  },
};
```

Then, define the Sinch call client and a variable to store the current call:

```javascript
var callClient = sinchClient.getCallClient();
var call;
```

When the call button is clicked, disable the call and answer buttons, tell the user who they're calling and initiate the call. Lastly, add a call listener to the current call.

```javascript
$("button#call").click(function (event) {
  event.preventDefault();
  clearError();

  $("button#call").attr("disabled", "disabled");
  $("button#answer").attr("disabled", "disabled");
  $("div#callLog").append(
    "<div>Calling " + $("input#callUsername").val() + "</div>"
  );

  call = callClient.callUser($("input#callUsername").val());
  call.addEventListener(callListener);
});
```

To hang up the call:

```javascript
$("button#hangup").click(function (event) {
  event.preventDefault();
  clearError();

  call && call.hangup();
});
```

## Receive incoming calls

Your app should also listen for incoming calls:

```javascript
callClient.addEventListener({
  onIncomingCall: function (incomingCall) {
    $("div#callLog").append(
      "<div>Incoming call from " + incomingCall.fromId + "</div>"
    );

    call = incomingCall;
    call.addEventListener(callListener);
  },
});
```

## Test it

To test your app, open two browser windows, log in as two different users and make the call. Some browsers will ask for permission to use the microphone on your computer when you place the call.

Happy coding\! If you have any questions, feel free to reach out to us on [Twitter](https://twitter.com/sinchdev) or via our [help page](https://www.sinch.com/customer-service/).
