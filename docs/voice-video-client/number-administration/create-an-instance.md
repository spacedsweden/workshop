---
title: Create an instance

description: ""
redirectFrom:
  - /docs/create-an-instance
---

# Create an instance

## Create an instance

As a second step, you need to create an instance with the ‘authorization’ string received from the authentication response (above).

### Headers

This is a protected resource and requires a [user signed request](authentication.md#user-signed-request).

```text
Authorization: User {authorization}
x-timestamp: {now}
```

Example:

```text
Authorization: User eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=
x-timestamp: 2015-06-20T11:43:10.944Z
```

### Request

```text
[POST]

URL:
https://api.sinch.com/v1/instance

\[body]
string - authorization
Version - version

\[Version]
string - os
string - platform
```

Example:

```json
{
  "authorization": "eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=",
  "version": {
    "os": "{os}",
    "platform": "{platform}"
  }
}
```

:::info Note

‘version’ data is mandatory, but is up to the client to decide how to populate it. Choose values that best represent your OS and platform combination.

:::

### Response

```text
[Instance]
  string   - id
  byte[]   - secret
  integer? - expiresIn
```

Example:

```json
{
  "id": "00a3ffb1-0808-4dd4-9c7d-e4383d82e445",
  "secret": "bRo76GRddEyetgJDTgkLHA==",
  "expiresIn": 172800
}
```
