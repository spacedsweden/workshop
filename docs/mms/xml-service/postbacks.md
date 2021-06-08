---
title: Sinch Postbacks
next:
  pages:
    - xml-service-mms-mo-postbacks
description: Get delivery status reports for each message that's sent through the XML API.
redirectFrom:
  - /docs/xml-service-postbacks
---

# Sinch Postbacks

Get delivery status reports for each message that's sent through the XML API.

## MMS MT Delivery Report Postbacks Overview

The MMS MT postback API notifies you of the delivery status of each message you send. There are two methods for delivering content; Binary and HTML. Following are postback notification formats depending on which method is used.

## MMS MT Postback Types

- MMS Delivery status
- saveMMS Encoding Status

## MMS MT Delivery Status

A postback notification called N101 is immediately sent after we begin to process the MMS. Upon receiving Delivery Report (DLR) from the carrier, the system generates postback notification N102 with the handset information. The N101 and N102 notifications are linked by tracking-id.

When the mobile network operator doesn't support MMS or the destination handset doesn't support the size of the content within the MMS, in case of Optimized MMS we fall back to SMS/HTML to deliver the message. In this method we deliver the MMS as an SMS containing a link to an HTML page with the content.

The fallback-sms-text is included in the SMS message text. The possible MMS status code that you may receive for the delivery status is one of following: N101, N102, E101, E102.

If you specified to send a Device Discovery Message then you may receive one of the following status codes regarding the delivery status of the Device Discovery Message: N501, N502, E501, E502.

<div class="magic-block-html">
    <div class="marked-table">
        <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
            <tbody>
            <tr class="even">
                <td>origin</td>
                <td>The notification origin, for example, MMS_MT means an MMS terminated on a mobile.</td>
            </tr>
            <tr class="odd">
                <td>code</td>
                <td>The postback notification code.</td>
            </tr>
            <tr class="even">
                <td>sent-as</td>
                <td>Indicates if the MMS was delivered as MMS (binary) or SMS (HTML).</td>
            </tr>
            <tr class="odd">
                <td>mms-id</td>
                <td>Id of the MMS Template.</td>
            </tr>
            <tr class="even">
                <td>status</td>
                <td>For N101 and N501, notification status can be “Message Sent”.
                    For N102 and N502, notification status can be “Message Sent/Delivered”.
                    For E101 and E501, notification status can be “Message Failed”.
                    For E102 and E502, notification status can be “Message,Sent/Expired”, “Message Sent/Rejected”, “Message Sent/Failed” or,“Message Sent/Not Supported”.</td>
            </tr>
            <tr class="odd">
                <td>from</td>
                <td>The shortcode the message is sent from</td>
            </tr>
            <tr class="even">
                <td>handset</td>
                <td>Handset profile returned inside Delivery Receipt. This is present only in N102 notification.</td>
            </tr>
            <tr class="odd">
                <td>to</td>
                <td>The recipient of the message.</td>
            </tr>
            <tr class="even">
                <td>tracking-id</td>
                <td>The ID to correlate API requests, and delivery receipts.</td>
            </tr>
            <tr class="odd">
                <td>operator-id</td>
                <td>Carrier Identification.</td>
            </tr>
            <tr class="even">
                <td>timestamp</td>
                <td>The timestamp the MMS was sent (N101) or when the MMS was delivered (N102).</td>
            </tr>
            <tr class="odd">
                <td>status-details</td>
                <td>Any additional information passed back from the carrier.</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

## Postback Schema

### N101 Status Code Examples

**N101 (Binary)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N101</code>
    <sent-as>MMS</sent-as>
    <status>Message Sent</status>
    <mms-id>39597</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>
    <operator-id>31003</operator-id>
    <timestamp>2014-06-07T07:27:29-05:00</timestamp>
</postback>
```

**N101 (HTML)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N101</code>
    <sent-as>SMS</sent-as>
    <status>Message Sent</status>
    <mms-id>39755</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>
    <operator-id>31004</operator-id>
    <timestamp>2014-06-07T07:27:34-05:00</timestamp>
    <status-details>Handset setting: mms with pass via HTML</status-details>
</postback>
```

### N102 Status Code Examples

**N102 (Binary)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N102</code>
    <sent-as>MMS</sent-as>
    <status>Message Sent/Delivered</status>
    <mms-id>39597</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>
    <operator-id>31003</operator-id>
    <timestamp>2014-06-07T07:27:34-05:00</timestamp>
    <handset>moto17c</handset>
</postback>
```

**N102 (HTML)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N102</code>
    <sent-as>SMS</sent-as>
    <status>Message Sent/Delivered</status>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>
    <operator-id>31004</operator-id>
    <timestamp>2014-06-07T07:28:09-05:00</timestamp>
</postback>
```

### Error Status Code Examples

#### E101

> When the system is unable to send an MMS we return a postback E101

#### E102

> When the MMS delivery fails due to various reasons we return a postback E102

**E101**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>E101</code>
    <status>Message Failed</status>
    <mms-id>39755</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>
    <operator-id>31004</operator-id>
    <status-details>Error fetching dynamic content</status-details>
</postback>
```

**E102**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>E102</code>
    <status>Message Sent/Rejected</status>
    <mms-id>39755</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>
    <operator-id>31004</operator-id>
    <status-details>Recipient blocked by mobile operator</status-details>
</postback>
```

### Device Discovery Message Status Code Examples

**N501**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N501</code>
    <sent-as>MMS</sent-as>
    <status>Message Sent</status>
    <mms-id>39755</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>
    <operator-id>31004</operator-id>
    <timestamp>2014-06-07T07:27:34-05:00</timestamp>
    <status-details></status-details>
</postback>
```

**N502**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N502</code>
    <sent-as>MMS</sent-as>
    <status>Message Sent/Delivered</status>
    <mms-id>39597</mms-id>
    <from>28444</from>
    <to>12399471613</to>
    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>
    <operator-id>31003</operator-id>
    <timestamp>2014-06-07T07:27:34-05:00</timestamp>
    <handset>moto17c</handset>
</postback>
```

## saveMMS Encoding status

When MMS is saved, we generate postback notification. When saving and encoding of the content is successful we generate N003. If encoding of the content failed we generate postback E002 containing mms-id and audio-name/video-name pointing to the content that failed to encode properly. When E002 is returned the mms-id should be considered corrupted. Note: The image-name is not included since image encoding is not supported.

| Variable   | Description                                              |
| ---------- | -------------------------------------------------------- |
| code       | N003 or E002 based on the success of the content coding. |
| origin     | MMS_MT for saving MMS content.                           |
| mms-id     | ID of the MMS.                                           |
| audio-name | URL to audio content that failed to encode properly.     |
| video-name | URL to video content that failed to encode properly.     |

### Status code examples

**N003 (Success)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>N003</code>
    <mms-id>35674</mms-id>
</postback>
```

**E002 (Failure)**

```xml
<postback>
    <origin>MMS_MT</origin>
    <code>E002</code>
    <mms-id>35674</mms-id>
    <audio-name>http://www.yoursite.com/audio/1.mp3</audio-name>
</postback>
```
