---
title: Log in
description: ""
redirectFrom:
  - /docs/log-in
---

# Log in

First you need to login to retrieve a token that will be used to create an instance.

## Headers

This is a [public resource](authentication.md#public-resources).

When logging in, you should always pass in the header the “number administration” key. This is the key that you should pass:

`669762D5-2B10-44E0-8418-BC9EE4457555`

:::info Note

Always use this exact key in the log in step. Don't use any of your app keys.

:::

```text
Authorization: Application 669762D5-2B10-44E0-8418-BC9EE4457555
x-timestamp: {now}
```

Example:

```text
Authorization: Application 669762D5-2B10-44E0-8418-BC9EE4457555
x-timestamp: 2015-06-20T11:43:10.944Z
```

## Request

```html
[POST]

URL:
https://userapi.sinch.com/v1/users/{type}/{identity}/authentication
```

Example:

```html
https://userapi.sinch.com/v1/users/email/address@example.com/authentication
```

```text
[body]
string - password
```

Example:

```json
{
  "password": "YOUR_ACCOUNT_PASSWORD"
}
```

## Response

```text
string - authorization
User   - user
```

Example:

```json
{
  "authorization": "eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=",
  "user": {
    "id": 123456789,
    "identities": [
      {
        "type": "email",
        "endpoint": "address@example.com"
      },
      {
        "type": "number",
        "endpoint": "+12055500000"
      }
    ],
    "profile": {
      "name": {
        "first": "Jane",
        "last": "Bloggs",
        "full": "Jane Bloggs"
      },
      "contact": {
        "email": "address@example.com"
      }
    }
  }
}
```
