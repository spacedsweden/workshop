---
title: Zapier
description: This guide will show you how to send and receive SMS in Zapier with the Sinch API.
redirectFrom:
  - /docs/sms-zapier
---

# Getting started with Zapier

This guide will show you how to send and receive SMS messages in Zapier with the Sinch API.

This guide shows the power of receiving and sending SMS in Zapier. Now you can explore all your favorite applications and see if they have a Zapier app that you can connect to an SMS messaging Zap.

## Things you'll need

- A free Sinch account with a test phone number. If you don't have one, click [here](./sinchaccount.md) to find out how to sign up and get your free test number.
- A Zapier account, If you don’t have one, you can create a [Zapier account](https://zapier.com/sign-up/).

If you already have them you can jump to [Using Sinch as a Zapier Trigger](/docs/sms/getting-started/zapier.md#using-sinch-as-a-zapier-trigger)

## Using Sinch as a Zapier Trigger

To get started with the Sinch app, install the Sinch App on Zapier [link](https://zapier.com/developer/public-invite/79749/049663e21af93167070920d64d26eaa9/).

Click "Accept invite and build zap."

In this first example, you will use the Sinch trigger to fill out a Google sheet every time you receive an SMS to your Sinch number.

## Choose App Event

When creating a Zap, search for "Sinch" when choosing app and event.

Select “New SMS” as trigger, it will trigger on any new messages that's sent to your Sinch number.

## Choose account

The next step is to “Sign in to Sinch” where you will see a prompt asking you to fill out some fields. Find your **_Service Plan ID_** and **_API token_** in the [Sinch dashboard](https://dashboard.sinch.com/sms/api/rest).

Copy and paste your **_Service Plan ID_** and **_API Token_** into the Zapier prompt and continue. It should now look something like this:

## Find Data

If you don't have any messages in your service plan, there won’t be any data to collect for Zap but, you should see some samples, otherwise you will see some of your old messages as samples.\

## Populate data in sheets

Create a Google Sheet and add two headers columns: **Phonenumber** and **Message**

Next in your Zap, click **continue** and search for **Google Sheets**

Connect your account and select **Create spreadsheet**. Go through all the steps and select the \***Phonenumber** column to have the From parameter from the Sinch Zap. Do the same for message.

Click **test and review** and in your **Google sheet** you will see a new row.

Click **done editing** and name your Zap.

## Send SMS using Zapier Actions

1. Add a column to your **Google Sheet** and call it reply.
2. Click the **+** button in your Zapier dashboard to create a new Zap. In this Zap we are going to use the _Google sheets_ as the Trigger.
3. Search for **Google sheets**.
4. Select the trigger **New or updated spreadsheet row**. Find your sheet by clicking thru the prompts and select reply as the trigger column.

5. Test and review, click **Do this** and find Sinch 1.0.0.
6. Select **New SMS** as action and confirm your account.\

These steps show how every time you enter/update a reply in an existing row, send that reply to the phone number we've in the first column.

Click test and review, and you should have an SMS to your phone.
