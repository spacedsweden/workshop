---
title: getMMSTemplates
next:
  pages:
    - xml-service-postbacks
description: >-
  List previously created MMS templates where the saveMMS API has been used.
  Read more.
redirectFrom:
  - /docs/xml-service-getmmstemplates
---
# getMMSTemplates

List previously created MMS templates where the saveMMS API has been used. Read more.

## Overview

List all the previously created MMS templates (mms-ids) created using the saveMMS API. Note, deleted templates are not included in this listing. All the MMS templates will be listed in the descending order of date (i.e., latest to the oldest). If no “start-date” is specified in the API request then by default all mms templates are listed. The default “page-number” is taken as 1 whereas the default “items-per-page” is 100, if not specified. GMT/UTC timestamps are accepted for “start-date”.

**Request Parameters:**

> Mandatory: action, api_key
>
> Optional: start-date, page-number, items-per-page

**Related Error Codes:**

> E104, E105, E108, E112, E113, E120, E212, E213, E214

### Request Example

**getMMSTemplates Request**

```xml
<request>
    <action>getMMSTemplates</action>
    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>
    <start-date>2014-03-31T11:30:00+00:00</start-date>
    <page-number>1</page-number>
    <items-per-page>3</items-per-page>
</request>
```

### Response Examples

**getMMSTemplates Success Response**

```xml
<response>
    <status>Success</status>
    <start-date>2014-03-31T11:30:00+00:00</start-date>
    <page-number>1</page-number>
    <items-per-page>3</items-per-page>
    <total-results>3</total-results>
    <mms-template>
         <mms-id>1234</mms-id>
         <mms-name>MMS-4</mms-name>
         <mms-subject>mms-test-4</mms-subject>
         <date-created>2014-10-31T09:30:00+00:00</date-created>
         <total-slides>2</total-slides>
         <mms-size>2048</mms-size>
    </mms-template>
    <mms-template>
         <mms-id>1233</mms-id>
         <mms-name>MMS-3</mms-name>
         <mms-subject>mms-test-3</mms-subject>
         <date-created>2014-10-30T19:00:00+00:00</date-created>
         <total-slides>4</total-slides>
         <mms-size>4096</mms-size>
    </mms-template>
    <mms-template>
         <mms-id>1230</mms-id>
         <mms-name>MMS-2</mms-name>
         <mms-subject>mms-test-2</mms-subject>
         <date-created>2014-10-30T08:30:00+00:00</date-created>
         <total-slides>2</total-slides>
         <mms-size>5126</mms-size>
    </mms-template>
</response>
```

**getMMSTemplates Failure Response**

```xml
<response>
    <status>Failure</status>
    <error-code>E214</error-code>
    <error-info>start-date is invalid</error-info>
</response>
```
