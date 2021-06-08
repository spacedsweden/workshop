---
title: Blacklisting numbers from callbacks
next:
  pages:
    - whatsapp-callback-store
description: Get to know how to blacklist numbers from generating callbacks.
redirectFrom:
  - /docs/whatsapp-blacklist-callback
---

# Blacklisting numbers from callbacks

Get to know how to blacklist numbers from generating callbacks.

## Add to blacklist endpoint

Blacklist numbers, preventing them from generating inbound message callbacks.

:::info Note

It can take up to five minutes for all caches to get up to date after blacklisting a number.

:::

### Request

`POST whatsapp/v1/{bot-id}/provision/blacklist`

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

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`503 Service Unavailable`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

## Remove from blacklist endpoint

Remove numbers from blacklist.

:::info Note

It can take up to five minutes for all caches to get up to date after removing a number from the blacklist.

:::

### Request

`DELETE whatsapp/v1/{bot-id}/provision/blacklist`

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

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`503 Service Unavailable`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

## Get blacklist endpoint

Get the numbers that are on the blacklist.

:::info Note

The blacklist is divided into pages, with one hundred numbers per page. A successful request returns a single page.

:::

### Request

`GET whatsapp/v1/{bot-id}/provision/blacklist`

The endpoint takes an optional query parameter:

| Name | Description                   | Default | Constraints                        | Required |
| ---- | ----------------------------- | ------- | ---------------------------------- | -------- |
| page | The blacklist page to request | 0       | Integer (0 denotes the first page) | No       |

**Sample request**

`GET whatsapp/v1/{bot-id}/provision/blacklist?page=1`

### Responses

`200 OK`

The response body will be a JSON object with the following parameter:

JSON object parameters:

| Name    | Description     | JSON Type    |
| ------- | --------------- | ------------ |
| numbers | List of MSISDNs | String array |

**Sample**

```json
{
  "numbers": ["+46732001122", "+46732002244"]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot doesn't reside. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)

`503 Service Unavailable`

There was an error with your request. The body is a JSON object described in the [introduction](/docs/whatsapp/introduction.md#http-errors)
