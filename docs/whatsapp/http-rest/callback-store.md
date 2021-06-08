---
title: Callback Store
next:
  pages:
    - whatsapp-capability
description: Get to know how to poll the API for callbacks.
redirectFrom:
  - /docs/whatsapp-callback-store
---

# Callback Store

Get to know how to poll the API for callbacks.

Sinch offers the ability to store your callbacks instead of sending them to a specified callback URL.

## Get message status updates endpoint

`GET whatsapp/v1/{bot-id}/callbacks/status/{message-id}`

### Responses

`200 OK`

The response body is a JSON object with the following parameters:

| Name    | Description                                                                  | JSON Type    |
| ------- | ---------------------------------------------------------------------------- | ------------ |
| results | List of [Sinch WhatsApp API callbacks](/docs/whatsapp/http-rest/callback.md) | Object array |

```json Sample
{
  "results": [
    {
      "type": "whatsapp",
      "statuses": [
        {
          "status": "success",
          "state": "delivered",
          "message_id": "01DPNXZ0WCF9XD19MH84XD0P62",
          "recipient": "+46732001122"
        }
      ]
    }
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors).

## Get inbound messages endpoint

`GET whatsapp/v1/{bot-id}/callbacks/notifications`

JSON object parameters:

| Name       | Description                     | JSON Type | Default    | Constraints             | Required |
| ---------- | ------------------------------- | --------- | ---------- | ----------------------- | :------: |
| start_time | Start time for inbound messages | String    | 2019-09-01 | Valid ISO-8601 datetime |    No    |
| end_time   | End time for inbound messages   | String    | `NOW`      | Valid ISO-8601 datetime |    No    |
| from       | Msisdn of the sender            | String    | N/A        | Valid MSISDN            |    No    |
| page       | Page number                     | Number    | 1          | Positive integer        |    No    |
| page_size  | List of MSISDNs                 | Number    | 20         | Positive integer        |    No    |

**Sample**

```json
{
  "page": 1,
  "page_size": 20,
  "from": "46732001122",
  "start_time": "2018-10-02T12:57:37.205Z",
  "end_time": "2019-10-02T12:57:37.205Z"
}
```

### Responses

`200 OK`

The response body is a JSON object with the following parameters:

| Name    | Description                                                                  | JSON Type    |
| ------- | ---------------------------------------------------------------------------- | ------------ |
| results | List of [Sinch WhatsApp API callbacks](/docs/whatsapp/http-rest/callback.md) | Object array |

**Sample**

```json
{
  "results": [
    {
      "type": "whatsapp",
      "notifications": [
        {
          "from": "46732001122",
          "to": "sinchbot",
          "message_id": "01DPNXZ0WCF9XD19MH84XD0P62",
          "message": {
            "type": "text",
            "body": "Hello bot I want to know something!"
          }
        }
      ]
    }
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors).
