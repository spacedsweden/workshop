---
title: Send OTP codes with text to speech calls using Sinch and Node.js
excerpt: >-
  Send OTP codes with text to speech calls using Sinch and Node.js In this
  tutorial you will learn how to use node.js to build a text to speech call that
  reads out pin-codes.
---
![pincodes-texttospeech.png](images/a6712af-pincodes-texttospeech.png)

In this tutorial I will show you how to use node.js to build a [text to speech](https://en.wikipedia.org/wiki/Speech_synthesis) call that reads out pin-codes. To read more about the Sinch callout API please see the [documentation](../../../voice/introduction.md).

## Other use cases

Common use cases for this type of call are weather- and fraud alerts, when you suspect that an SMS is not delivered.

## What you need to get started

- Node development environment
- Application - key and secret. Get one here if you don’t have one already - [Sign up](https://portal.sinch.com/#/signup).
- Some credits on your account. Set up your phone on the dashboard and my boss will give you $2 to get you started\!

## Code

For this code snippet I will use the [sinch-request](https://www.npmjs.com/package/sinch-request) npm package to sign the requests. This package is not required but it makes life a lot easier. Below code makes a call to +15551234567 and play “Your pin code is 1234” in US English when user is answering the call.

```javascript
var sinchRequest = require('sinch-request');
var https = require('https');

var creds = { key: 'your key',
  secret: 'your secret'
};

var bodyData = JSON.stringify({ method: 'ttsCallout',
  ttsCallout:
   { destination: { type: 'number', endpoint: '+15551234567' },
     domain: 'pstn',
     custom: 'customData',
     locale: 'en-US',
     prompts : "#tts[Your pin code is 1234]", } });

var options = {
  method: 'POST',
  host: 'callingapi.sinch.com',
  port: 443,
  path: '/v1/callouts',
  data: bodyData
};

sinchRequest.applicationSigned(options, creds);
var req = https.request(options, function(response) {
  var data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    console.log('Response body: ' + data);
    //here you can i.e save your callid,
  });
});
req.end(options.data);
```

## Next steps

In the next tutorial I will show you how to make IVR menus that enable you to collect input from the user.
