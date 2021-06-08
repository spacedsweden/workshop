---
title: Send SMS
description: Learn how to quickly send SMS messages in node.js applications with the Sinch API
redirectFrom:
  - /docs/sms
enableToc: false
---

# Sending SMS Messages

Learn how to quickly send SMS messages in a node.js application with the Sinch API.

## Things you'll need

Before you can get started, you need the following already set up:

* A free Sinch account with a test phone number. If you don't have one, click [here](./../sinchaccount.md) to find out how to sign up and get your free test number.
* [Node.js](https://nodejs.org/en/) and a familiarity with how to create a new app.

## Set it up

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
   const servicePlanId = "";
   const apiToken = "";
   const sinchNumber = "";
   let toNumber = "";
   
   var request = require("request");
   var messageData = {
     from: sinchNumber,
     to: [toNumber],
     body: "This is a test message from your Sinch account",
   };
   var options = {
     method: "POST",
     url: "https://us.sms.api.sinch.com/xms/v1/" + servicePlanId + "/batches",
     headers: {
       accept: "application/json",
       "content-type": "application/json",
       Authorization: "Bearer " + apiToken,
     },
     body: JSON.stringify(messageData),
   };

   request(options, function (error, response, body) {
     console.log(response.body);
     if (error) throw new Error(error);
     console.log(body);
   });
   ```

4. Assign your values to the following parameters:

   |Parameter |Your value
   --- | ---
   |`servicePlanId` |The service plan ID found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest).|
   |`apiToken` |The API token found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest). Click **Show** to reveal your API token.|
   |`sinchNumber` |Any number you've assigned to your Sinch account. Find the number on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest) by clicking the service plan ID link and scrolling to the bottom of the page.|
   |`toNumber` |The phone number to which you want to send the test SMS message.|

5. Save the file.

6. Now you can execute the code and send your test SMS message. Run the following command:
  
   ```shell
   node index.js
   ```

The code you used in the **index.js** file sends a POST request to the Sinch API **/batches** endpoint to send the SMS message. Click [here](../../../../../openapi/sms/tag/Batches) to read more about the batches endpoint.
