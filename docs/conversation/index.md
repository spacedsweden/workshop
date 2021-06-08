---
title: Conversation API
description: >-
  Send and receive messages globally on many popular channels with ease and confidence when using the Sinch Conversation API.
enableToc: false
productLandingPage: true
hero:
  title: Omnichannel messaging.
  description: Send and receive messages over the most popular channels in the world using the Conversation API.
  background: conversation/conversationHero.svg
  enabled: true
  mainActionLabel: Send your first message
  mainActionTarget: ./getting-started.md
  smallCard: ##same structure as nav and sidebars
    - page: ./channel-support.md
      title: Supported channels
      description: Learn about the different features supported on each channel.
    - page: ./oas/conversation.page.yaml
      description: Read the full Conversation API specification
      title: API Reference
    - page: ./getting-started/send-a-message-with-fb-messenger.md
      description: Learn how to send messages to your users on Facebook messenger
      title: Facebook messenger
---

# Conversation API

Send and receive messages globally over SMS, RCS, WhatsApp, Viber Business, Facebook messenger and other popular channels with ease and confidence using the Sinch Conversation API.

The Sinch Conversation API endpoint uses built-in transcoding gives you the power of conversation across all supported channels and, if required, full control over channel specific features. Additionally, a single callback contains all aspects of the conversation for easy integration into the Sinch portfolio of services or any third-party platform.

The Sinch Conversation API is available globally with hosting locations in the [US - East](https://us.conversation.api.sinch.com) and the [EU - Ireland](https://eu.conversation.api.sinch.com), and additional channels will be supported as they become popular. If you are interested and are an existing customer, please contact your account manager. If you are a new customer, please contact a [Sinch representative](https://www.sinch.com/contact-us/).

## Authentication

The Conversation API uses OAuth2 **Access Tokens** to authenticate API calls. The first step to obtaining an **Access Token** is to create an **Access Key** in the [Sinch portal](https://dashboard.sinch.com/settings/access-keys) under Settings -> Access Keys. A **client_id** and **client_secret** will be provided when creating an **Access Key** in the portal. The **project** ID will also be visible on the **Access Key** page in the portal. The created **Access Key** can be used in the different authentication flows in both regions. The following snippet illustrates how to obtain an **Access Token** that can be used to authenticate towards the Conversation API.

To get an OAuth token, you will post your client_id and secret to the Sinch endpoint. The example below shows an authentication towards the Conversation API in the US. To obtain a valid Access Token from the corresponding EU endpoint, you should use [this](https://eu.auth.sinch.com/oauth2/token).

```shell
curl https://auth.sinch.com/oauth2/token -d grant_type=client_credentials --user <client_id>:<client_secret>
```

A call to the Conversation API, in the US, can then be done by including the obtained **Access Token** in the request header. See below for an example:

```shell
curl -H "Authorization: Bearer <access token>" \
 https://us.conversation.api.sinch.com/v1beta/projects/<Project ID>/apps
```

To use Basic authentication, use your `client_id` as the basic auth username and your secret as the password. Basic authentication towards the Conversation API in the EU is also possible since the created Access Key is valid for the EU region as well.

```shell
curl https://us.conversation.api.sinch.com/v1beta/projects/<Project ID>/apps --user <client_id>:<client_secret>
```

## Supported Conversation API Channels and Message Types

Our Conversation API supports multiple channels that can be used to send different message types. These supported channels and more information can be found by clicking [here](https://developers.sinch.com/docs/channel-support).

### Supported Message Types

| Message Type | Description |
| ------------ | ----------- |
| `Text message` | A message containing only text. |
| `Media message` | A message containing media such as images, GIFs, documentation and video. |
| `Choice message` | A message containing "choices"/"actions" and description. |
| `Card message` | A rich message which consists of text and description with image or video. It can also contain a set of "choices"/"actions." |
| `Carousel message` | A list of cards rendered horizontally on our supported channels (Messenger, Viber Bot and RCS) and as a numbered list on SMS, Viber Business Messages and WhatsApp. |
| `Location message` | A message defining a physical location on a map. |
| `Template message` | A message with predefined template. Requires an existing template. |

### Postman collection

Sinch offers a Postman collection for easy setup and testing during development. For ease of use, follow the next link [Postman Collection](https://www.getpostman.com/collections/79a07a7d299afe46658b), into a Firefox browser or, use the Import option in Postman.

After importing the collection, fill in the following variables:

| Variable | Value |
| -------- | ----- |
| `PROJECT` | Your PROJECT ID |
| `APP` | Your app ID |
| `CLIENT_ID` | Your CLIENT_ID |
| `CLIENT_SECRET` | Your client secret |

For testing purposes, fill the WEBHOOK_URL by visiting <https://webhook.site/> and use the generated link - the one under the **Your unique URL** label.

Values for other variables can be obtained by calling corresponding requests:

- `CONTACT` - ID of contact created by calling **Create contact** request.
- `WEBHOOK_ID` - ID of webhook created by calling **Create webhook** request.
- `CONVERSATION` - a Conversation is created automatically when sending a new message. For example, with a Text Message request, send a message, then call [List conversations](https://developers.sinch.com/reference#conversation_listconversations) to get the ID of the conversation for this variable.

### Errors

When requests are erroneous, the Sinch Conversation API will respond with standard HTTP status codes, such as `4xx` for client errors. All responses include a JSON body of the form:

```json
{
  "error": {
    "code": 401,
    "message": "Request had invalid credentials.",
    "status": "UNAUTHENTICATED",
    "details": [{
      "@type": "type.googleapis.com/google.rpc.RetryInfo",
      ...
    }]
  }
}
```

The table below describes the fields of the error object:

| Name    | Description                         | JSON Type        |
| ------- | ----------------------------------- | ---------------- |
| Code    | HTTP status code                    | Number           |
| Message | A developer-facing error message    | String           |
| Status  | Response status name                | String           |
| Details | List of detailed error descriptions | Array of objects |

#### Common error responses

| Status | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| 400    | Malformed request                                                       |
| 401    | Incorrect credentials                                                   |
| 403    | Correct credentials but you don't have access to the requested resource |
| 500    | Something went wrong on our end, try again with exponential back-off    |
| 503    | Something went wrong on our end, try again with exponential back-off    |
