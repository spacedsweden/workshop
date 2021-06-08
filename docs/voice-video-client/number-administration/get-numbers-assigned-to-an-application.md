---
title: Get numbers assigned to an application
description: ""
redirectFrom:
  - /docs/get-numbers-assigned-to-an-application
---

# Get numbers assigned to an application

## Get numbers assigned to an application

This endpoint lists all numbers that are assigned to a particular app.

### Headers

This is a protected resource and requires an [instance signed request](authentication.md#instance-signed-request).

```text
Authorization: Instance {instance ID}:{instance signature}
x-timestamp: {now}
```

Example:

```text
Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:a6p7RYw8bMr3JuZh1LArvWTLJjIgCeQj5nsRZaXW7VQ=
x-timestamp: 2015-06-20T11:43:10.944Z
```

### Request

```text
[GET]

URL:
https://portalapi.sinch.com/v1/applications/key/{applicationKey}/numbers
```

Example:

```text
https://portalapi.sinch.com/v1/applications/key/bb7b4e39-4227-4913-8c81-2db4abb54fb3/numbers

[body]
  empty
```

Example:

```json
{}
```

### Response

```text
Number[]

[Number]
  long - number
  integer - groupId
  string[] - capabilities
  string? - applicationKey
  string - countryId
  string - city
  string - country
  string - areaCode
  string? - expires
  Money    - cost
```

Example:

```json
[
  {
    "number": 14150005551,
    "groupId": 13,
    "capabilities": ["voice"],
    "applicationKey": "bb7b4e39-4227-4913-8c81-2db4abb54fb3",
    "countryId": "US",
    "city": "SAN FRANCISCO",
    "country": "US",
    "areaCode": "415",
    "expires": "2015-12-31T23:59:59+00:00",
    "cost": {
      "amount": 0.0,
      "currencyId": "USD"
    }
  }
]
```

The `capabilities` can either be `voice` or `sms`.

### Error Codes

```text
[Error Codes]
  InvalidScheme (40301)       - The authorization scheme 'instance' is required.
  ResourceNotFound (40400)    - Application with the key {KEY_HERE} wasn't found.
  TemporaryDown (50300)       - Service is temporarily unavailable, please try again later.
```
