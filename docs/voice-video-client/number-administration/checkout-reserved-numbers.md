---
title: Checkout reserved numbers
description: ""
redirectFrom:
  - /docs/checkout-reserved-numbers
---

# Checkout reserved numbers

## Checkout reserved numbers

This endpoints allows you to check out the numbers that you have reserved, so that they're assigned to your account. Please make sure you have enough credit to rent the numbers.

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
[POST]

URL:
https://portalapi.sinch.com/v1/organisations/id/{organisationId}/numbers/shop
```

Example:

```text
https://portalapi.sinch.com/v1/organisations/id/8888123/numbers/shop

[body]
  string[] - referenceIds
```

Example:

```json
{
  "referenceIds": ["c8b27491-3379-44f3-af31-fbbfbb2ba510"]
}
```

### Response

```text
204 - No Content
```

### Error Codes

```text
[Error codes]
  NotEnoughCredit (40200)         - Insufficient funds to complete the transaction.
  ForbiddenRequest (40300)        - The current user is not the owner of the organisation: {ORGANISATION_ID}
  InvalidScheme (40301)           - The authorization scheme 'instance' is required.
  ResourceNotFound (40400)        - Unable to assign numbers to organization: reservation(s) not found or expired
  ApplicationConfiguration (42200)- Accounting not set up for this organization.
```
