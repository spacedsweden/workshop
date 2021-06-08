---
title: Introduction
description: >-
  WhatsApp for Business messaging. The Sinch WhatsApp Business Messaging API provides a rich, enterprise-grade messaging solution for clients who wish to communicate with their customers via WhatsApp.
enableToc: false ##should be disabled default for product landing page
productLandingPage: true
hero:
  title: Whatsapp API
  description: WhatsApp for Business messaging. The Sinch WhatsApp Business Messaging API provides a rich, enterprise-grade messaging solution for clients who wish to communicate with their customers via WhatsApp.
  enabled: true
  mainActionLabel: Read more
  mainActionTarget: docs/whataspp/http-rest.md
---

# Introduction

WhatsApp for Business messaging. The Sinch WhatsApp Business Messaging API provides a rich, enterprise grade messaging solution for clients who wish to communicate with their customers via WhatsApp.

The Sinch WhatsApp Business Messaging API provides a rich, enterprise grade messaging solution for clients who wish to communicate with their customers via WhatsApp.

With over 1.5 billion users globally using WhatsApp regularly to communicate with friends and family, it really does represent the digital extension of the users living room. It’s the inner circle of your customer’s communication so bringing your trusted brand communications to that inner circle has huge potential.

Integrating the Sinch WhatsApp Business Messaging API with your own backend systems enables Rich, High fidelity, contextual conversations to be established via the WhatsApp channel.

:::info Note

Try out the WhatsApp API live in our new tutorial here [WhatsApp Tutorial](/docs/tutorials/javascript/send-your-first-whatsapp-message.md).

:::

## Authentication

The Sinch WhatsApp API securely authenticates via a bot identifier and bearer token pair. During the initial client on boarding process, these will be provided by your account manager.

To be able to authenticate the access token needs to be passed. For all WhatsApp end-points it's required to set the [bearer token](https://oauth.net/2/bearer-tokens/) in the authorization HTTP header like: `Authorization: Bearer AbCdEf123456`. Where the string `AbCdEf123456` is the bearer authorization token.

If no authentication header is present or if the bearer token is invalid, the API will respond with HTTP 401 Unauthorized.

## BearerAuth

|                           |        |
| ------------------------- | ------ |
| Security scheme type      | HTTP   |
| HTTP Authorization Scheme | bearer |

## HTTP Errors

Responses with status `400 Bad Request` and `401 Unauthorized` will present a JSON object in the body explaining the error.
It has the following structure:

| Name      | Description                                                         | JSON Type |
| --------- | ------------------------------------------------------------------- | --------- |
| `message` | A error message describing the general error.                       | `String`  |
| `details` | Human readable description of the error. Can be used for debugging. | `String`  |

## Base URL

The following WhatsApp URLs can be used by the WhatsApp API. We have servers in the US and the EU. Link related to the region in which the Sender ID has been provisioned should be used. Note, those URLs can't be used interchangeably.

:::info Note

We recently added support for a EU server. We are currently working to add a production server in Asia, so stay tuned!

:::

| Server        | URL                                  |
| ------------- | ------------------------------------ |
| US Production | <https://us1.whatsapp.api.sinch.com> |
| EU Production | <https://eu1.whatsapp.api.sinch.com> |

## Swagger

The following Swagger UI URLs can be used to test our API.

| Server        | URL                                                  |
| ------------- | ---------------------------------------------------- |
| US Production | <https://us1.whatsapp.api.sinch.com/swagger-ui.html> |
| EU Production | <https://eu1.whatsapp.api.sinch.com/swagger-ui.html> |

## Headers

| Header name   | Description                                                                   | Required           |
| ------------- | ----------------------------------------------------------------------------- | ------------------ |
| Authorization | Bearer token described [above](/docs/whatsapp/introduction.md#authentication) | Always             |
| Content-Type  | Should be `application/json` when sending data through request body           | When body provided |

## Accepted media types

Any media file sent through the Sinch WhatsApp API will be processed before it's sent to the recipient.
While the maximum file size for every uploaded media is 100 MB, be aware that the file also needs to meet the post-processing limits listed below. This means that a message with a file size that's larger than the post-processing limits is not guaranteed to be sent successfully. The result will depend on whether WhatsApp's post-processing of the media file can reduce the file size sufficiently or not.

| Message type | Supported content types                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Post-processing size limit |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| document     | Any content type listed for other message types,<br>`text/plain`, `text/csv`, `application/pdf`, `application/msword`, `application/x-tar`, `application/rtf.0`, `application/vnd.ms-powerpoint`, <br>`application/vnd.openxmlformats-officedocument.presentationml.presentation`, <br>`application/vnd.openxmlformats-officedocument.wordprocessingml.document`, <br>`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, <br>`application/vnd.oasis.opendocument.presentation`, <br>`application/vnd.oasis.opendocument.spreadsheet`, <br>`application/vnd.ms-excel`, <br>`application/vnd.oasis.opendocument.text` | 100 MB                     |
| image        | `image/jpeg`, `image/png`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 5 MB                       |
| audio        | `audio/aac`, `audio/mp4`, `audio/amr`, `audio/mpeg`, `audio/ogg`, `audio/opus`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 16 MB                      |
| video        | `video/mp4`, `video/3gpp`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 16 MB                      |
| sticker      | `image/webp`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 100 KB                     |

:::info Note

Video files must have H.264 video codec and AAC audio codec.

:::

:::info Note

Media URLs in [callbacks](/docs/whatsapp/http-rest/callback.md) expire after seven days.

:::

## Formatting Text Messages

WhatsApp allows formatting your messages. Use these formatting symbols to format a message:

| Symbol                   | Formatting        | Example                      |
| ------------------------ | ----------------- | ---------------------------- |
| Asterisk (\*)            | **Bold**          | This is \*nice\*.            |
| Underscore (\_)          | _Italics_         | She said \_yes\_!            |
| Tilde (~)                | ~~Strikethrough~~ | What a ~rainy~ sunny day!    |
| Three backticks (\`\`\`) | `Code`            | \`\`\`print 'Success';\`\`\` |

To use emojis in text, encode them with UTF-16 unicode.

| Symbol             | Example               |
| ------------------ | --------------------- |
| :grinning:         | Hi \ud83d\ude00       |
| :white-check-mark: | \u2705 repair the car |
| :musical-keyboard: | I like \uD83C\uDFB9   |

## Supported language codes

Following language codes are supported for template messages

| Language         | Code  |
| ---------------- | ----- |
| Afrikaans        | af    |
| Albanian         | sq    |
| Arabic           | ar    |
| Azerbaijani      | az    |
| Bengali          | bn    |
| Bulgarian        | bg    |
| Catalan          | ca    |
| Chinese (CHN)    | zh_CN |
| Chinese (HKG)    | zh_HK |
| Chinese (TAI)    | zh_TW |
| Croatian         | hr    |
| Czech            | cs    |
| Danish           | da    |
| Dutch            | nl    |
| English          | en    |
| English (UK)     | en_GB |
| English (US)     | en_US |
| Estonian         | et    |
| Filipino         | fil   |
| Finnish          | fi    |
| French           | fr    |
| German           | de    |
| Greek            | el    |
| Gujarati         | gu    |
| Hausa            | ha    |
| Hebrew           | he    |
| Hindi            | hi    |
| Hungarian        | hu    |
| Indonesian       | id    |
| Irish            | ga    |
| Italian          | it    |
| Japanese         | ja    |
| Kannada          | kn    |
| Kazakh           | kk    |
| Korean           | ko    |
| Lao              | lo    |
| Latvian          | lv    |
| Lithuanian       | lt    |
| Macedonian       | mk    |
| Malay            | ms    |
| Malayalam        | ml    |
| Marathi          | mr    |
| Norwegian        | nb    |
| Persian          | fa    |
| Polish           | pl    |
| Portuguese (BR)  | pt_BR |
| Portuguese (POR) | pt_PT |
| Punjabi          | pa    |
| Romanian         | ro    |
| Russian          | ru    |
| Serbian          | sr    |
| Slovak           | sk    |
| Slovenian        | sl    |
| Spanish          | es    |
| Spanish (ARG)    | es_AR |
| Spanish (SPA)    | es_ES |
| Spanish (MEX)    | es_MX |
| Swahili          | sw    |
| Swedish          | sv    |
| Tamil            | ta    |
| Telugu           | te    |
| Thai             | th    |
| Turkish          | tr    |
| Ukrainian        | uk    |
| Urdu             | ur    |
| Uzbek            | uz    |
| Vietnamese       | vi    |
| Zulu             | zu    |

## Click to WhatsApp

A business can provide a simple method via a Web Page, or embedded within a QR-Code to enable an end user to initiate a conversation through the WhatsApp Business API.
While not a specific endpoint of the WhatsApp Business API, this method has been tested to work.
From the businesses perspective, this avoids initial notification charges as the conversation is customer initiated.
Furthermore, because the customer care session is immediately activated, an implicit 24 hour opt-in enables the business to reply during that time period.

The business would be advised to obtain an explicit, compliant opt-in during that initial customer care session to enable the business to initiate a future conversation using a notification (Template)

Conversation start URL:

`GET https://api.whatsapp.com/send`

With path variable parameters:

| Name  | Description                                 | Constraints                                         | Required |
| ----- | ------------------------------------------- | --------------------------------------------------- | :------: |
| phone | Your WhatsApp Business Account phone number | E.164 format without '+' sign. example 447537453580 |   Yes    |
| text  | Message content to be sent to your account  | Any text                                            |    No    |

Example to open conversation with +44 7537 453580:

    https://api.whatsapp.com/send?phone=447537453580

Example to send message with content "Text message content" to +44 7537 453580:

    https://api.whatsapp.com/send?phone=447537453580&text=Text%20message%20content
