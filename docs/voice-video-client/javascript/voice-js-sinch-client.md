---
title: Sinch Client
excerpt: Describes how to use the Sinch Client.
next:
  pages:
    - voice-js-calling
redirectFrom:
  - /docs/voice-js-sinch-client
---

# Sinch Client

The `SinchClient` class is the SDK entry point. it's used to configure the user's and device's capabilities, as well as providing access to feature classes such as the MessageClient, CallClient, and VerificationClient.

## Instantiating the SinchClient

To use Sinch you first need to create a "sinchClient" object using the application key and you can specify some other options.

```javascript
var sinchClient = new SinchClient({
  applicationKey: "<application_key>",
});
```

The \*\* is obtained from the Sinch Developer Dashboard. In this example, the SinchClient is set up for Verification.

## Asynchronous Sinch Calls

The Sinch SDK contains many asynchronous methods. Several network requests are made in the background when making certain method calls and, while this happens, your code continues to execute.

When using asynchronous methods in Sinch, there are two ways of acting on the result. All asynchronous methods accept two callbacks as additional parameters, first the success callback, then the fail callback.

Additionally, all asynchronous methods in Sinch also return a promise, which will either be resolved or rejected. If it's resolved the next method in the chain, which is specified using `.then()`, is called. If there is a failure, the method specified in `.fail()` is called.

### Sinch with callbacks

```javascript
var handleSuccess = function() {...};
var handleFail = function() {...};

sinchClient.start(loginObj, handleSuccess, handleFail);
```

### Sinch with promises

```javascript
var handleSuccess = function() {...};
var handleFail = function() {...};

SinchClient.start(loginObj)
    .then(handleSuccess)
    .fail(handleFail);
```

The benefit of using promises is that it's easy to make a _chain of method calls_ and the code is clearer, but either method works.

> **Note**
>
> If both callbacks and promises are used, the execution order is for callbacks to be executed first followed by the methods in the promise-chain, specified using \`\`.then()\`\`
