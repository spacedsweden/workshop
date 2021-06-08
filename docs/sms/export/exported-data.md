---
title: Export Types
description: >-
  Working with your sinch Data
---

## Export data

## About run parameters

The tables below include the required and optional run parameters to be provided when creating an export job.

Note that:
Creating a run for nearly all of the export types requires providing the run parameters intervalStart and intervalEnd. Provide these parameters as [DateTime](/docs/data/exportapi/#working-with-date-and-time-fields).

If intervalStart is provided, it must be before (and not equal to) intervalEnd.

The optional parameters will filter results to just those rows matching the provided values we match from the start of a field as standard. Optional parameters can also be sent in as an Array, when you send it an array, it will be treated as OR statement.

Example All SMS sent on October 1st in Canada OR US

```json
{
  "exportType": "SMSMessages.daily.itemized",
  "deliveryFormat": "JSON",
  "parameters": {
    "intervalStart": "2020-10-01",
    "intervalEnd": "2020-10-01T23:59:59",
    "countryCode": ["CA", "US"]
  },
  "runInterval": "ONCE",
  "webhookUrl": "https://yourcallback.url/"
}
```

| Export type                                  | Required parameters           | Optional parameters                       |
| -------------------------------------------- | ----------------------------- | ----------------------------------------- |
| [SMSMessages.Itemized](#SMS-Messages-Export) | intervalStart</br>intervalEnd | countryCode</br>direction</br>status</br> |

## SMS Messages Export

This reports will export all your sms messages regardless of status, inbound and outbound for a given time period.

exportType: SMSMessages.Itemized

### Parameters

| Paramter      | Required | Data type | Description                                                                  | Example     |
| ------------- | -------- | --------- | ---------------------------------------------------------------------------- | ----------- |
| intervalStart | Yes      | DateTime  | What date export should be From                                              | 2021-01-01  |
| intervalEnd   | Yes      | DateTime  | What date export should be To                                                | 2021-01-15  |
| countryCode   | No       | DateTime  | ISO country code of the mobile phone number                                  | 15612600684 |
| direction     | No       | String    | If the message was sent from API or to the API (MO, MT) INCOMING or OUTGOING | INCOMING    |
| status        | No       | String    | inProgress, succeeded, failed, noResponse, rejected                          | succeeded   |

### Data Columns

| ColumnName                      | Data Type | Description                                                                                                                                                                                              | Example                                             |
| ------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| messageId                       | string    | unique identifier of the message                                                                                                                                                                         |                                                     |
| clientId                        | string    | service plan id for rest, system id for SMPP                                                                                                                                                             | SMPPPUECGW0                                         |
| direction                       | string    | If the message was sent from API or to the API                                                                                                                                                           | INCOMING or OUTGOING                                |
| to                              | string    | Where the message was sent to [E164](https://en.wikipedia.org/wiki/E.164) with out +, or short code                                                                                                      | 15612600684, 7733                                   |
| from                            | string    | Who the message was sent from [E164](https://en.wikipedia.org/wiki/E.164) with out +, or short code. In some countries it can also be a alphanumeric code such as ACME                                   | Acme, 15612600684, 7733                             |
| countryCode                     | string    | ISO country code of the mobile phone number                                                                                                                                                              | US                                                  |
| operator                        | string    | The mobile operator of the handset sending or receiving the message                                                                                                                                      | T-Mobile                                            |
| type                            | string    | Message type, text or binary                                                                                                                                                                             | T-Mobile                                            |
| body                            | string    | The content of the message (Not in Alpha 1 )                                                                                                                                                             | Hello world                                         |
| concatenatedPartsCount          | integer   | Number of parts if this message is a smaller segment of a message that's too long to be sent as a single SMS. For details see [long messages](https://developers.sinch.com/docs/sms-guide#long-messages) | 3                                                   |
| concatenatedPart                | integer   | Which concatenated part is this? 0 if not a concatenated part, else counting from 1 (wee above)                                                                                                          | 2                                                   |
| status                          | string    | the status of the message                                                                                                                                                                                | inProgress, succeeded, failed, noResponse, rejected |
| error                           | string    | Long human friendly description if any errors that have occurred                                                                                                                                         | invalid destination, validity period expired, etc   |
| acceptedTime                    | dateTime  | When the message was accepted by the API                                                                                                                                                                 | 2007-11-06T16:34:41.020Z                            |
| deliveredToOperatorTime         | dateTime  | Time when the operator accepted the message                                                                                                                                                              | 2007-11-06T16:36:41.023Z                            |
| deliveryReceiptFromOperatorTime | dateTime  | When operator received a status update                                                                                                                                                                   | 2007-11-06T16:36:44.034Z                            |
| deliveryReceiptTime             | dateTime  | Time when Sinch sent the status update                                                                                                                                                                   | 2007-11-06T16:36:44.037Z                            |
| priceAmount                     | string    | the price of the message, up to 6 decimals?                                                                                                                                                              | 0.0005                                              |
| priceCurrency                   | string    | [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency code                                                                                                                                         | USD                                                 |
