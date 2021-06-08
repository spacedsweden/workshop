---
title: Use the Sinch JavaScript SDK in Your Servlet Project
excerpt: >-
  This tutorial will focus mostly on authentication; after that, the
  implementation in your HTML and JavaScript files is the same as the sample
  projects included in the SDK.
---
## Sinch setup

* [Sign up](https://portal.sinch.com/#/signup) for a Sinch account
* In the [developer dashboard](https://portal.sinch.com/), create a new app and take note of the app key and secret
* [Download](https://sinch.readme.io/page/downloads) the Sinch JavaScript SDK

## Create the user ticket

Create a new servlet project with one servlet for authentication that has a doPost method:

```java
public class AuthServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public AuthServlet() {
        super();
    }
}

protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // If you want to authenticate user,
    // generate a ticket to pass to the Sinch Client
}
```

Next, create the login/signup form view that will send a post request to the `doPost` method above. (Ideally, you would have more of a distinction between logging in and signing up, but I’ll leave that to you to best implement with your existing user database.)

Create a file called **index.jsp** (or index.html) in the WebContent directory. This will be a simple username and password form:

```html
<form action="authenticate" method="post">
    Username: <input type="text" name="username" /><br>
    Password: <input type="password" name="password" /><br>
    <input type="submit" value="Login/Signup"/>
</form>
```

Now, let’s generate the ticket in `doPost`. First, define several variables that you will use to create the ticket. (Be sure to sub in your app key and secret.):

```javascript
int expiresIn = 3600; //seconds
String applicationKey = "YOUR_APP_KEY"; //change me!
String applicationSecret = "YOU_APP_SECRET"; //change me!

//date in iso8601 format
Date date= new java.util.Date();
DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
String timestamp = dateFormat.format(date);

//user-submitted username and password
String username = request.getParameter("username");
String password = request.getParameter("password");
```

Next, create the ticket and store it in the session object, which you can access from the view:

```javascript
String userTicket = "{\"identity\":{\"type\":\"username\""
            + ",\"endpoint\":\"" + username + "\"},\"expiresIn\":"
            + expiresIn + ",\"applicationKey\":\"" + applicationKey
            + "\",\"created\":\"" + timestamp + "\"}";

String userTicketBase64 = Base64.encodeBase64String(userTicket.getBytes());

String signature = "";
try {
    Mac sha256HMAC = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKey = new SecretKeySpec(Base64.decodeBase64(applicationSecret.getBytes()), "HmacSHA256");
       sha256HMAC.init(secretKey);
       signature = Base64.encodeBase64String(sha256HMAC.doFinal(userTicket.getBytes()));
} catch (Exception e) {
    e.printStackTrace();
}

HttpSession session = request.getSession();
session.setAttribute("ticket", userTicketBase64 + ":" + signature);
response.sendRedirect("success.jsp"); //still need to create this file
```

**Note:** This will authenticate any username/password combination. Before generating the ticket, you need to check the username/password combo against your database of users.

## Add the Sinch SDK

First, create a **success.jsp** file, where `doPost` redirects to.

To add the Sinch SDK, just move **sinch.min.js** to your WebContent folder. Then simply include the JavaScript file in the head of **success.jsp**:

```javascript
//while you're at it, add jquery too!
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="sinch.min.js"></script>
```

To keep things simple, I put the script to start the Sinch client inside my **success.jsp** file. Here, you will get the token from the session:

```html
<script>
  $('document').ready(function() {

    //define the sinch client
    sinchClient = new SinchClient({
      applicationKey: "YOUR_APP_KEY", //change me!
      capabilities: {calling:true, messaging: true}, //only use what you need here
      startActiveConnection: true,
      onLogMessage: function(message) {
        //messages appended to the body when
        //the state of the client changes
        $("body").append("<p>" + message.message + "</p>");
      },
    });

    //here's that user ticket!
    sinchClient.start({"userTicket":"<%= session.getAttribute("ticket").toString() %>"})
      .then(function() {
        //now, you can start using the client to make calls & send messages
        $("body").append("<p>SinchClient is started!</p>");
      }); //handle error if no ticket, or ticket is no longer valid
    });
</script>
```

When running this in your browser, after logging in, you will see the changes in client state as HTML like so:
![app.png](images\a47b508-app.png)

Congratulations, you did it\! You can now use the Sinch client to add calling or messaging to your web app.
