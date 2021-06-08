---
title: Sending SMS With cURL
description: >-
  In this tutorial, you will use cURL to send an SMS message to a mobile phone.
---
In this tutorial, you will use cURL to send an SMS message to a mobile phone.

For [SMS API](https://www.sinch.com/products/messaging/sms/) pricing by destination, visit our [pricing pages](https://www.sinch.com/products/messaging/sms/).

<!-- We’ve also made a video tutorial to guide you through the process. -->

## Setup

> 1. Create a [Sinch developer account](https://portal.sinch.com/#/signup)
> 2. In the dashboard, click “Apps” in the left-hand menu
> 3. Click “Create new app”
> 4. Give your app a name and click “Create”
> 5. Keep your app key and secret safe as you will need this in a minute
> 6. Open your terminal

## Sending the SMS via the API

Then, in the cURL command, add the phone number and message you want to send, and add your app key and secret. Once you are finished, you should have something that looks like this:

```shell
curl --user "application\\your_app_key:your_app_secret" --data '{"message":"your_message"}' -H 'Content-Type: application/json' https://messagingapi.sinch.com/v1/sms/the_phone_number
```

Copy and paste this into your terminal, wait a few seconds, and you should receive the SMS message to the phone number you added in the command.

## What’s next?

This is just a basic demo of our [SMS API](https://www.sinch.com/products/messaging/sms/), but read [our documentation <sms-classic-sinch>` and other `tutorials](doc:tutorials-introduction) to see how you can integrate this with your own backend. Have questions? Just email the team [here](mailto:hello@sinch.com).
