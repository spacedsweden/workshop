---
title: Session Management
description: Save and resume client sessions in the Sinch JavaScript SDK.
next:
  pages:
    - voice-js-miscellaneous
redirectFrom:
  - /docs/voice-js-session-management
---

Between each page view, page reload or visit to the website, the current session is lost. Often there is an interest in re-using the same session and not forcing the end-user to re-authenticate. This can be solved by passing a session object into `sinchClient.start()`, and if the session is valid it will resume and you don’t have to prompt the user for any sign in. If it fails, you should fall back to whatever authentication method you’d like to use.

In order to be able to restore a session, it’s first required to save it on successful login.

## Saving a session

If you’d like to save the session after authentication, the code may look something like this:

```javascript
var sinchClient = new SinchClient({
  applicationKey: "MY_APPLICATION_KEY",
  capabilities: { messaging: true },
});

sinchClient.start({ username: "alice", password: "somethingSecure" });
then(function () {
  localStorage["sinchSession-" + sinchClient.applicationKey] = JSON.stringify(
    sinchClient.getSession()
  );
});
```

This code will start a sinchClient, authenticate using Sinch authentication and on success store the session in `localStorage`.

> **Note**
>
> In the future, Sinch may handle this for you

## Resuming a session

Next time the same visitor come back to the website, it’s nice if we can resume the same session. If we assume we've a saved session object, similar to the example above, we can resume it by passing the sessionObject to `sinchClient.start()`.
![authentication_papi_resume.png](images/6faf940-authentication_papi_resume.png)
Resume authenticated
session

In this case the code may look something like this:

```javascript
//Parse the saved session object
var sessionObj = JSON.parse(
  localStorage["sinchSession-" + sinchClient.applicationKey] || "{}"
);

//If there is a valid session object
if (sessionObj.userId) {
  sinchClient.start(sessionObj).then(handleStartSuccess).fail(showLoginUI); //On failure, the session wasn't valid => user must re-login
} else {
  showLoginUI(); //There is no session => user must login
}
```

The session object can be stored in any secure way you see best fit, for example in the browser `localStorage` as shown above. The session object can be retrieved from sinchClient using the `sinchClient.getSession()` method after a successful call to `sinchClient.start()`.

See the Sample IM app for an example on working with sessions.
