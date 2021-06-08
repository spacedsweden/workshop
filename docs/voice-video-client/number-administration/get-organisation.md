---
title: Get organization

description: ""
redirectFrom:
  - /docs/get-organisation
---

# Get organization

## Get organization

With the instance that you created you can now perform instance signed requests, which are needed for the number administration endpoints. First you should retrieve your organisation Id.

### Headers

This is a protected resource and requires an [instance signed request](authentication.md#instance-signed-request).

```text
Authorization: Instance {instance ID}:{instance signature}
x-timestamp: {now}
```

Example:

```text
Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:bb9i9SGuw8mPspPF6WHzIZxw4yQxdOwGaDliMi+IhCU=
x-timestamp: 2015-06-20T11:43:10.944Z
```

### Request

```text
[GET]

URL:
https://api.sinch.com/v1/organisations

[body]
  empty
```

Example:

```text
{}
```

### Response

```text
[Organisation]
  int - id
  string? - name
  string? - website
  string? - countryId
  string? - phone
  string? - vatnumber
```

Example:

```json
  {
     "id":"8888123",
     "name":"Acme"
     "website":"http://www.example.com"
     "phone":"+12055500000"
     "countryId":"US"
  }
```
