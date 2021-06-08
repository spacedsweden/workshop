---
title: MM7 Service
next:
  pages:
    - mm7-service-introduction
description: >-
  MM7 is the standard protocol used by the carriers to send and receive MMS
  messages. Send and receive rich multimedia content. Read more.
redirectFrom:
  - /docs/mm7-service
---

# MM7 Service

MM7 is the standard protocol used by the carriers to send and receive MMS messages. Send and receive rich multimedia content. Read more.

MMS APIs are currently offered via an implementation of the MM7 protocol. MM7 is the standard protocol used by the carriers to send and receive MMS messages. It's a SOAP based protocol sent over HTTP.

**MM7 supports the following API actions:**

| **Action**           | **Functionality**                                                    |
| -------------------- | -------------------------------------------------------------------- |
| `mm7_submit`         | Send an MT Message to a device.                                      |
| `mm7_deliver`        | Receive an MO message from the device.                               |
| `mm7_deliveryreport` | Receive a Delivery report for a previously submitted MT MMS Message. |

**Base URL:**

The following URL can be used by the MM7 API.

| Server      | URL                              |
| ----------- | -------------------------------- |
| General API | <https://api.ci.mblox.com/mm7/v1/> |

The use of our MM7 API is only available for accounts with a paid plan. We support submitting MMS messages with MM7 version 5.3.0 to 6.8.0. Your VASPID will be your API Key. We will also issue you a VASID to submit with your message. The VASID will be unique on each short code. All traffic is encrypted in transit via SSL/TLS.
