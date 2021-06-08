---
title: REST API
next:
  pages:
    - rcs-rest-getting-started
description: >-
  The REST API provides Universal Profile 2.0 RCS messaging with granular
  controls to allow fallback to SMS when a handset is not RCS enabled. Find out
  more today.
redirectFrom:
  - /docs/rcs-http-rest
---

# REST API

The REST API provides Universal Profile 2.0 RCS messaging with granular controls to allow fallback to SMS when a handset is not RCS enabled. Find out more today.

The Sinch RCS REST API provides [Universal Profile 2.0](https://www.gsma.com/futurenetworks/rcs/resources-rcs-events/universal-profile/) RCS messaging with granular controls to allow fallback to SMS when a handset is not RCS enabled.

[SMS Fallback](/docs/rcs/http-rest/rest-sms-fallback.md) and SMS status reporting are facilitated using the [SMS REST API](/docs/sms/guide.md) that allows for the use of existing tools to receive and collect delivery reports and mobile originated messages which should be familiar to existing users.

It's possible to setup the RCS REST API to use an existing SMS account for all fallback SMS traffic. It's also possible to use the RCS REST API without SMS fallback, in this case an SMS account is not needed.

When [SMS Fallback](/docs/rcs/http-rest/rest-sms-fallback.md) is desired, fine grained control is provided [by configuring fallback conditions](/docs/rcs/http-rest/rest-sms-fallback.md#fallback-conditions).

JSON (`application/json`) is the content type of both requests and responses if not otherwise specified.

Requests with invalid JSON will be rejected.

Null values can be omitted in requests and will be omitted in responses. In some cases explicitly setting null will overwrite a previously set value with null.

## MSISDN

Only MSISDNs in international format are accepted by the API.

MSISDNs can be sent in with or without a leading `+` (i.e. `+123456789` or `123456789` are equivalent) or with a leading `00`. Any spaces, dashes or brackets, will also be ignored by the API.

All MSISDNs returned by the REST API will be without a `+` or `00` prefix, even if they were originally sent in with one.

### Timestamps

Timestamps are represented using the [ISO-8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

All timestamps returned by the API will be in UTC with millisecond precision.

The time zone can be specified in accordance with ISO-8601. If no time zone offset is specified (local time in ISO-8601) then UTC will be implied.

## HTTP Status Codes

The REST API returns an HTTP status and code each time a request is made.

### HTTP Statuses

The following HTTP status codes are used by the API. Additional codes might be added in the future. If you encounter a code not in this list please consult the [HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10/) for a definition.

| Status                     | Description                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 200 OK                     | The request was successful.                                                                                            |
| 400 Bad Request            | The request doesn't conform to the API. The request body should provide more information.                              |
| 401 Unauthorized           | The authentication token is invalid for this service plan.                                                             |
| 404 Not Found              | The path is invalid, or no resource exists with the given ID.                                                          |
| 405 Method Not Allowed     | The path is valid but not for this method.                                                                             |
| 409 Conflict               | Duplicate message-id provided or trying to revoke an irrevocable message                                               |
| 415 Unsupported Media Type | The request `Content-Type` is missing or unsupported. Most operations expect `application/json`.                       |
| 500 Internal Server Error  | An unexpected internal error occurred, and the request wasn't processed.                                               |
| 503 Service Unavailable    | The service is unable to perform the request at this point. Most likely due to a required subsystem being unavailable. |

### HTTP Errors

Responses with status `400 Bad Request` and `409 Forbidden` will contain a JSON object explaining the error in the body. This object has the following structure:

#### Error

JSON Representation

**JSON Representation for errors**

```javascript
{
  "error": string,
  "field_errors": [
    object(FieldError), ...
  ]
}
```

| Field        | Type                                 | Description                                                   | Default | Constraints | Required |
| ------------ | ------------------------------------ | ------------------------------------------------------------- | ------- | ----------- | -------- |
| error        | string                               | Descriptive message of the error                              | No      | N/A         | Yes      |
| field_errors | arrayOf([`FieldError`](#fielderror)) | List of field errors, each element describes a specific field | No      | N/A         | No       |

#### FieldError

JSON Representation

**JSON Representation**

```javascript
{
  "field": string,
  "errors": [
    string, ...
  ]
}
```

| Field  | Type            | Description                                | Default | Constraints | Required |
| ------ | --------------- | ------------------------------------------ | ------- | ----------- | -------- |
| field  | string          | The field for which this error is relevant | No      | N/A         | Yes      |
| errors | arrayOf(string) | List of errors for the field               | No      | N/A         | Yes      |
