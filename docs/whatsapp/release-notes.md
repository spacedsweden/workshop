---
title: Release notes
description: >-
  See how the Sinch WhatsApp API is evolving and find out about new features and
  bug fixes.
redirectFrom:
  - /docs/release-notes-whatsapp
---

# Release notes WhatsApp API

See how the Sinch WhatsApp API is evolving and find out about new features and bug fixes.

## 2021-03-09

- GDPR Sensitive data privacy improvements.

## 2021-01-26

- WhatsApp API performance and stability improvements.
- Improvements to the integration with the Conversation API.

## 2021-01-12

- WhatsApp API performance and stability improvements.
- Improvements to the integration with the Conversation API.
- Improvement for media files monitoring.

## 2020-11-24

- WhatsApp API performance improvements.

## 2020-11-03

- WhatsApp API performance improvements.

## 2020-09-08

- Performance and security improvements.
- Option to have the callbacks sent from the Sinch WhatsApp API to the customer's endpoint signed using the [HMAC algorithm](https://en.wikipedia.org/wiki/HMAC). To be able to use this feature a HMAC key needs to be delivered in the provisioning Excel form. For more information see the [Callback signature](/docs/whatsapp/http-rest/callback.md#signature) documentation.

## 2020-08-12

- Upgrade FB API gateways for bots from 2.29.1 to 2.29.3. Details can be found in [Facebook changelog (Aug 11, 2020 (v2.29.3))](https://developers.facebook.com/docs/whatsapp/changelog#wa2293)

## 2020-08-11

- Support marking inbound messages as read. See [Marking messages as read](/docs/whatsapp/http-rest/callback.md#mark-inbound-message-as-read)
- Support forwarded and frequently forwarded flag in inbound message. See [Callback for forwarded message](/docs/whatsapp/http-rest/callback.md#sample-inbound-forwarded-message)

## 2020-07-28

- Improvement for sending messages during heavy load
- Improvement for sending media messages

## 2020-06-30

- Improvements in phone number validation - less restrictive rules are now used - number doesn't have to be approved by authoritative evidence example ITU, IR 21…
- UNKNOWN type of inbound message also opens Customer Care Session now - this type of messages are related with Live Location messages that are not supported by WhatsApp Business API - these messages can be send from mobile phone app

## 2020-06-09

- Improvements in error handling for unsupported animated stickers - better error message is returned now.
- Improvements in phone number verification when sending message.

## 2020-05-26

- Root CA SSL certificate replacement. More information and instructions are available on following links for [EU](https://status.sinch.com/incidents/013jd1r183pn) and [US](https://status.sinch.com/incidents/041d39nsxb4k)
- Video files are now supported in media template
- A profile image can now be included in a contact message sent to the customer's callback URL
- Improvements for inbound sticker messages - auto cleanup for old stickers file enabled
- Improvements for Customer Care Session management - DELETED and SYSTEM statuses don't start a CC Session anymore

## 2020-05-12

- New interactive message templates. See [Sending template message](/docs/whatsapp/http-rest/message.md#template-message).
- Fix issue with missing DELETED status for MO messages.
- Improve error handling for sending messages.
- Upgrade google libphonenumber library.

## 2020-04-28

- Add POST method to the capability endpoint
- Add Swagger UI to the API. See [introduction](/docs/whatsapp/introduction.md#swagger).
- Fix bug with delayed FAILED status when sent media file is not accessible because of SSL certificate error.
- Improve error handling for video files with incorrect codecs.
- Fix response code when calling the capability endpoint with empty body.

## 2020-03-31

- Improvements for processing of status update event timestamps returned in callbacks (sometimes later events had earlier timestamps example SENT before DISPATCHED).
- Improvements in error handling when adding admin to chat group.
- Improvements in recipient phone number validation.

## 2020-03-10

- New Sticker pack management API - business can now create, update or delete stickers pack group and use it in Customer Care messages.
- Support for stickers in incoming messages from end user - Sticker messages are now sent back to business’s callback as other media Customer Care messages.
- Add limitations and validation for media provider name. When business creates new media provider, name for that provider can be 200 length max and contain only alphanumeric characters plus “-” and/or “\_”.
- MSISDN validation improvement with new version of google’s library libphonenumber.

## 2020-02-25

- WhatsApp profile of message sender (MO messages) are now present in callback body sent to business endpoint (available only for text, location and contact message types).
- New Customer Care message type sticker added. Supported media type is “image/webp”.

## 2020-02-11

- Fix issue with missing customer callbacks for messages delivered over 14 days after sent.
- Upgrade WhatsApp Business API client (dockers) to latest v2.27.8.
- Upgrade google libphonenumber library.

## 2020-01-31

- Fix bug with dot ('.') prefix in cookies domain.
- Add fail message when trying to add a number as admin if that number is not part of that group.
- Add support for filename parameter for document template messages.
- New API endpoint for getting the content of the blacklist.
- Change validation of numbers when adding to and removing from blacklist.
- Fix issue with missing customer callbacks for messages from recently created phone numbers.
- Add additional MIME type support for media files.
