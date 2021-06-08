---
title: Opt-In-and-Outs
next:
  pages:
    - whatsapp-callback
  description: Callback
description: >-
  Read how to enable or disable users to receive business messages via WhatsApp
  via Sinch WhatsApp API.
redirectFrom:
  - /docs/whatsapp-opt-in-and-outs
---

# Opt-In-and-Outs

Read how to enable or disable users to receive business messages via WhatsApp via Sinch WhatsApp API.

All Business initiated conversations via the Sinch WhatsApp Business API must start with an “Opt-In” by the user. This can be collected through any third party channel. For example in an SMS message, In-Line with a Web Form, in an Email, or even via a deep-link in print media.

You can record a [opt-in](/docs/whatsapp/http-rest/opt-in-and-outs.md#opt-in-endpoint) by the API call described below and once the “Opt-In” is recorded you’ll be able to message that customer via the Sinch WhatsApp Business API.

Businesses must provide a method by which customers may opt-out of receiving future messages from your organization. The [opt-out-endpoint](/docs/whatsapp/http-rest/opt-in-and-outs.md#opt-out-endpoint-deprecated) should be handled using the API call below.

:::info Note

If a customer initiates contact with a WhatsApp Business, this will constitute as a temporary opt-in meaning that the business is allowed to send messages to that customer for 24 hours since the last received message. After that period has expired, a active opt-in is required before the business is allowed to send messages to that customer again.

:::

## Opt-in policy change 9th July 2020

As WhatsApp will be updating their opt-in policy on 9th July 2020, the opt-in requirements for the Sinch WhatsApp Business API will also be updated.

There will be updated requirements:

- Businesses must clearly state that a user is opting in to receive messages from the business over WhatApp
- Businesses must clearly state the name of the business that the user is opting in to receive messages from
- Businesses must comply with applicable law

The policy will no longer dictate the following requirements that are in the current opt-in policy:

- That opt-ins must be obtained in a third-party channel
- That opt-in permission is obtained in-line and contextually during the relevant user flows
- That there is a visual element (example a check box) next to the WhatsApp name and logo, with adjacent language stating type of information that will be messaged
- That businesses provide an ability to edit which WhatsApp number is used for the opt-in

Additionally, businesses should:

- Explicitly call out the types of messages that the user is opting in to (example delivery updates)
- Avoid messaging people too frequently
- Provide instructions for how customers can opt out and honor these requests
- Monitor their quality rating, especially when rolling out new opt-in methods

## Opt-In endpoint

Opt-in numbers to enable the receiving of business messages via WhatsApp. Opting in already opted in numbers
would be ignored but not rejected. To remove previously opted in number use DELETE Request.

### Request

`POST whatsapp/v1/{bot-id}/provision/optin`
`DELETE whatsapp/v1/{bot-id}/provision/optin`

JSON object parameters:

| Name    | Description     | JSON Type    | Default | Constraints      | Required |
| ------- | --------------- | ------------ | ------- | ---------------- | :------: |
| numbers | List of MSISDNs | String array | N/A     | 1 to 20 elements |   Yes    |

**Sample**

```json
{
  "numbers": ["46732001122", "46732002244"]
}
```

### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described [here](/docs/whatsapp/introduction.md#http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described [here](/docs/whatsapp/introduction.md#http-errors)

## Opt-Out endpoint DEPRECATED

Opt-out number(s) to prevent them from receiving messages from the business. This endpoint is deprecated - use `DELETE whatsapp/v1/{bot-id}/provision/optin` instead

### request

`POST whatsapp/v1/{bot-id}/provision/optout`

JSON object parameters:

| Name    | Description     | JSON Type    | Default | Constraints      | Required |
| ------- | --------------- | ------------ | ------- | ---------------- | :------: |
| numbers | List of MSISDNs | String array | N/A     | 1 to 20 elements |   Yes    |

**Sample**

```json
{
  "numbers": ["46732001122", "46732002244"]
}
```

### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described [here](/docs/whatsapp/introduction.md#http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described [here](/docs/whatsapp/introduction.md#http-errors)
