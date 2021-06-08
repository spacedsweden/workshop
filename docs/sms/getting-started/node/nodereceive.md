---
title: Receive SMS
description: Learn how to quickly receive SMS messages in node.js applications with the Sinch API
redirectFrom:
  - /docs/sms
enableToc: false
---

# Receiving SMS Messages

Learn how to quickly set up a node.js server to receive SMS messages with the Sinch API.

## Things you'll need

Before you can get started, you need the following already set up:

* A free Sinch account with a test phone number. If you don't have one, click [here](./../sinchaccount.md) to find out how to sign up and get your free test number.
* [Node.js](https://nodejs.org/en/) and a familiarity with how to create a new app.
* [ngrok](https://ngrok.com/). You'll use ngrok to open a tunnel to your local server.

## Set it up

We use webhooks to notify your application when someone sends a text to your Sinch number. To handle these, you will learn how to create a webserver and make it reachable on the Internet.

1. Create a new node app with npm.

   ```shell
   npm init
   ```

   Accept the defaults for the application.

2. Add the request package with npm to generate the necessary dependencies.

   ```shell
   npm install request
   ```

3. Create a new file named **index.js** in the project and paste the below code into the file:

   ```javascript
   const http = require("http");
   const server = http.createServer((req, res) => {
     let data = [];
     req.on("data", (chunk) => {
       data.push(chunk);
     });
     req.on("end", () => {
       console.log(JSON.parse(data));
     });
     res.end();
   });
   server.listen(3000);
   ```

4. Start the server by executing the following command:

   ```shell
   node index.js
   ```

5. Now you need to open a tunnel to the server you just set up. Open a terminal or command prompt and enter `ngrok http 3000`.
6. Copy the HTTP address that ends with **.ngrok.io**.
7. You need to configure a Callback URL for your Sinch account. Login to your [dashboard](https://dashboard.sinch.com/sms/api/rest). Click on the service plan ID link and edit the **Callback URL** field with the ngrok.io domain URL from the previous step.
8. Using your phone, send an SMS message to the test phone number on your Sinch account. In the ngrok interface, you should see a successful 200 response.
