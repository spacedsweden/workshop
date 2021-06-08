---
title: SMS Fallback
enableToc: false
description: >-
  When a RCS message doesn't send properly a SMS fallback can be used instead.
  Read more.
redirectFrom:
  - /docs/rcs-rest-sms-fallback
---

# SMS Fallback

When a RCS message doesn't send properly a SMS fallback can be used instead. Read more.

The RCS REST API enables robust support for SMS fallback based on a range of configurable conditions.

When fallback occurs, the message is handed over to [Sinch SMS API](/docs/sms/guide.md) and further status updates are available in accordance with [Delivery Reports](/docs/sms/guide.md#receiving-delivery-report-callbacks) and SMS REST API [Callbacks](/docs/sms/guide.md#callbacks).

Fallback is indicated by receiving a `StatusReportFallbackDispatched` on the agent's webhook endpoint as described in [RCS Callback Request](/docs/rcs/http-rest/rest-receiving-updates-callbacks.md#callback-request). The status report includes the `external_ref` field referencing a `batch_id` provided by the SMS REST API [Batches Endpoint](/docs/sms/guide.md#send-a-batch-message).

Fallback SMS service plan is configured during provisioning of the RCS REST API.

Fallback and condition configuration is controlled in detail by providing [`FallbackInfo`](/docs/rcs/http-rest/rest-messages-endpoint.md#fallbackinfo) in [Send a message API Endpoint](/docs/rcs/http-rest/rest-messages-endpoint.md#send-a-message).

## Fallback conditions

| Condition              | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rcs_unavailable        | _enabled_  | Fallback to SMS when the targeted MSISDN is not reachable by RCS. This will happen immediately after the user agent's capabilities have been established.                                                                                                                                                                                                                                                  |
| capability_unsupported | _disabled_ | NOTE: Not currently enabled. Fallback to SMS if the specific capability needed to deliver the provided message payload is not supported by the receiving MSISDN, example, the device doesn't support media messages.                                                                                                                                                                                       |
| expire                 | _enabled_  | Fallback to SMS if the per message provided (See ExpireInfo) or RCS REST API system wide(48h) message expiry happens.<br><br> This means that a delivered notification wasn't received before the message expired. The RCS message will be revoked before sending the fallback SMS. Revocation is also configurable in the FallbackInfo object.                                                            |
| agent_error            | _disabled_ | Fallback to SMS if a fatal agent error occurs with a RCS supplier or within the RCS REST API platform.<br><br> Enabling SMS fallback on agent error guarantees that an SMS is sent instead of potentially delaying a message because of unexpected issues in the RCS delivery pipeline.<br><br> Agent errors shouldn't occur as RCS matures, but is useful if delivery using any channel is the priority. |
