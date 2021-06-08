---
title: Delivery Report Statuses
description: ""
redirectFrom:
  - /docs/mm7-service-delivery-report-statuses
---

# Delivery Report Statuses

The following table lists the responses returned with delivery reports.

| Status        | Status text   | Description                                                                                                                                                                                           |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deferred      | Deferred      | The end user’s handset has retrieved the MMS header, but hasn't,downloaded the full message from the mobile operator. The end user may,still download the message at a later time.                    |
| Expired       | Expired       | The mobile operator couldn't contact the handset before reaching the,expiry time. Each mobile operator has their own expiry times after which,they will stop trying to send messages such as an MMS. |
| Forwarded     | Forwarded     | The message has been sent successfully to the mobile network.                                                                                                                                         |
| Indeterminate | Indeterminate | The mobile operator couldn't determine if the message was delivered,correctly. This occurs when the handset can't return an MMS delivery,report.                                                     |
| NotSupported  | NotSupported  | Request is not supported                                                                                                                                                                              |
| Rejected      | Rejected      | Technical issues/System or Server errors/Content blocked by Mobile Operator/Exceeded MMS Size/ Other errors                                                                                           |
| Retrieved     | Success       | The message was successfully sent to the handset.                                                                                                                                                     |
| Unreachable   | Unreachable   | Server/Endpoint is Unreachable                                                                                                                                                                        |
| Unrecognized  | Unrecognized  | The end user’s handset can't download the MMS.                                                                                                                                                        |
