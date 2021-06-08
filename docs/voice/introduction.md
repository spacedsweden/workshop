---
title: Introduction
next:
  pages:
    - voice-rest-api-calling-api
description: >-
  This document provides a detailed user guide and reference documentation on the Sinch Voice REST API. 
redirectFrom:
  - /docs/voice-rest-api-intro
---
<style>
.rtPbw {
    width: 150%;
    max-width: 1200px;
}
td {
  font-size: 13px;

}
table th:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 5%;
}
table th:nth-of-type(3) {
    width: 20%;
}
table th:nth-of-type(4) {
    width: 20%;
}
</style>

# API at a glance

|Configuration   |HTTP Verb   |Description   |Core|
|:---|:---|:---|:---|
|/configuration/numbers/                            |GET   |show owned numbers                                       |```https://callingapi.sinch.com/calling/[version]```
|/configuration/numbers/                            |POST  |provision owned numbers to an application                   |```https://callingapi.sinch.com/calling/[version]```
|/configuration/numbers/                            |DELETE|remove owned numbers from an application                    |```https://callingapi.sinch.com/calling/[version]```
|/configuration/callbacks/applications/{applicationkey}|GET   |show current configured callback(s) for application          |```https://callingapi.sinch.com/calling/[version]```
|/configuration/callbacks/applications/{applicationkey}|POST  |provision current configured callback(s) for application      |```https://callingapi.sinch.com/calling/[version]```
|/calling/query/number/{number}                     |GET   |show number details                                      |```https://callingapi.sinch.com/calling/[version]```

|Conference  |HTTP Verb   |Description   |Region based|
|:---|:---|:---|:---|
|/conferences/id/{conferenceId}                     |GET   |show all conference participants                           |```https://calling.api.sinch.com/calling/[version]```
|/conferences/id/{conferenceId}/{callId}              |PATCH |mute / unmute a conference participant                     |```https://calling.api.sinch.com/calling/[version]```
|/conferences/id/{conferenceId}                     |DELETE|kick all conference participants                           |```https://calling.api.sinch.com/calling/[version]```
|/conferences/id/{conferenceId}/{callId}              |DELETE|kick single conference participant                         |```https://calling.api.sinch.com/calling/[version]```

|Ongoing call interaction  |HTTP Verb   |Description   |Region based|
|:---|:---|:---|:---|
|/calls/id/{callId}                                |GET   |show ongoing / post call status                            |```https://calling.api.sinch.com/calling/[version]```
|/calls/id/{callId}                                |PATCH |SVAML (Instructions, actions), ICE, ACE, DICE               |```https://calling.api.sinch.com/calling/[version]```
|/calls/id/{callId}/leg/{callLeg}                    |PATCH |SVAML (Instructions, actions), ICE, ACE, DICE               |```https://calling.api.sinch.com/calling/[version]```

|Recordings  |HTTP Verb   |Description   |Region based|
|:---|:---|:---|:---|
|/recording?from=timestamp&to=timestamp&page=int&pageSize=int  |GET   |Sinch Drive         |```https://calling.api.sinch.com/calling/[version]```
|/recording/{key}                                  |GET   |Sinch Drive              |```https://calling.api.sinch.com/calling/[version]```
|/recording/{key}                                  |DELETE|Sinch Drive               |```https://calling.api.sinch.com/calling/[version]```

|Callouts |HTTP Verb   |Description   |Region based|
|:---|:---|:---|:---|
|/callouts                                        |POST  |SVAML and ICE,ACE,PIE                                     |```https://calling.api.sinch.com/calling/[version]```

# Introduction

This document provides a detailed user guide and reference documentation on the Sinch Voice REST API. For general information on how to use the Sinch APIs including methods, types, errors and authorization, please check the [Using REST](authentication.md) page.

## Overview

When using Sinch for voice calling, the Sinch dashboard works as a big telephony switch. The dashboard handles incoming phone call (also known as _incoming call “legs”_), sets up outgoing phone calls (or _outgoing call “legs”_), and bridges the two. The incoming call leg may come in over a data connection (from a smartphone or web application using the Sinch SDKs) or through a local phone number (from the PSTN network). Similarly, the outgoing call leg can be over data (to another smartphone or web application using the Sinch SDKs) or the PSTN network.

For most call scenarios, you can use the Sinch SDKs on a smartphone or web client to establish calls without the need of additional integration. For more control or flexibility of the calls, you can use the Sinch REST APIs to manage the calls.

Controlling a call from your application is done by responding to callbacks from the Sinch platform and/or by calling REST APIs in the Sinch platform from your application. For more details on the callbacks triggered from the Sinch platform see the [Callback API](rest-api/callback-api.md).

For more details on the REST APIs to that can be used to manage calls see the [Calling API](../../../docs/voice/rest-api/voice/tag/Calling-API/*).

These are the typical call scenarios that you can control with the Sinch Callback and Calling APIs:

- [App to phone calls](#app-to-phone-calls)
- [App to app calls](#app-to-app-calls)
- [Phone to phone calls](#phone-to-phone-calls)
- [Text-to-speech calls](#text-to-speech-calls)
- [Conference calls](#conference-calls)
- [SIP trunking calls](rest-api/sip-trunking.md)

## API Quick Reference

The following sections give a brief overview of the Voice REST API methods.

### Callback API

To use callback events you need to assign a callback URL in the Sinch portal under your app settings.

| Event  | HTTP Verb | Functionality                                                                                  |
| ------ | --------- | ---------------------------------------------------------------------------------------------- |
| ICE    | POST      | [Incoming Call Event callback](rest-api/callback-api.md#incoming-call-event-callback-ice)      |
| ACE    | POST      | [Answered Call Event callback](rest-api/callback-api.md#answered-call-event-callback-ace)      |
| DiCE   | POST      | [Disconnect Call Event callback](rest-api/callback-api.md#disconnect-call-event-callback-dice) |
| PIE    | POST      | [Prompt Input Event callback](rest-api/callback-api.md#prompt-input-event-callback-pie)        |
| Notify | POST      | [Notify Event callback](rest-api/callback-api.md#notify-event-callback-notify)                 |

### Calling API

The calling-related APIs are divided into two categories - _traffic management_ and _configuration management_. _Traffic management_ encompasses management of individual calls. Since a call always belongs to a region, the corresponding regional endpoints must be used. _Configuration management_ is agnostic to individual calls and hence a global endpoint is used.

### Regional Endpoints - Traffic Management (TM)

| Endpoint | Region |
| -------- | ------ |
| `https://calling-euc1.api.sinch.com/calling/[version]` | Europe |
| `https://calling-use1.api.sinch.com/calling/[version]` | United States |
| `https://calling-sae1.api.sinch.com/calling/[version]`  | South America |
| `https://calling-apse1.api.sinch.com/calling/[version]` | South East Asia 1 |
| `https://calling-apse2.api.sinch.com/calling/[version]` | South East Asia 2 |
| `https://calling.api.sinch.com/calling/[version]` | redirected by Sinch to an appropriate region |

:::info Version
Current version is `v1`
:::

For cases where the call is the result of an incoming PSTN, SIP or data call, the endpoint to use for managing that call is supplied in the ICE event.

ICE callbacks will also provide region-specific URLs in the `callResourceUrl` property. Use the nearest base URL to access the following voice service resources:

| Functionality | URL | HTTP Verb |
| ------------- | --------- | -----------------------------|
| [Manage Call](rest-api/calling-api.md#manage-call) | `/calls/id/[callId]` | PATCH |
| [Get call result](rest-api/calling-api.md#get-call-result) | `/calls/id/[callId]` | GET |
| [Get conference info](rest-api/calling-api.md#get-conference-info) | `/conferences/id/[conferenceId]` | GET |
| [Mute/Unmute conference participant](rest-api/calling-api.md#mute-unmute-conference-participant)| `/conferences/id/[conferenceId]/[callId]` | PATCH |
| [Kick conference participant](rest-api/calling-api.md#kick-conference-participant) | `/conferences/id/[conferenceId]/[callId]` | DELETE |
| [Kick all conference participants](rest-api/calling-api.md#kick-all-conference-participants) | `/conferences/id/[conferenceId]` | DELETE |
| [Place text-to-speech or conference call](rest-api/calling-api.md#conference-and-text-to-speech-callouts) | `/callouts` | POST |

### Global Endpoint - Configuration Management (CM)

| Endpoint | Region |
| -------- | ------ |
| `https://callingapi.sinch.com/calling/[version]` | Global |

:::info Version
Current version is `v1`
:::

ICE callbacks will also provide region-specific URLs in the `callResourceUrl` property. Use the nearest base URL to access the following voice service resources:

| Functionality | URL | HTTP Verb |
| --------------| --- | --------- |
| [Get a list of your numbers](rest-api/calling-api.md#get-numbers) | `/configuration/numbers/` | GET |
| [Assign numbers to an app](rest-api/calling-api.md#update-numbers) | `/configuration/numbers/` | POST |
| [Un-assign numbers to an app](rest-api/calling-api.md#un-assign-number) | `/configuration/numbers/` | DELETE |
| [Get callback URLs of your app](rest-api/calling-api.md#get-callbacks) | `/configuration/callbacks/applications/[applicationkey]` | GET |
| [Update the callback URLs of your app](rest-api/calling-api.md#update-callbacks) | `/configuration/callbacks/applications/[applicationkey]` | POST |
| [Query a number](rest-api/calling-api.md#query-number) | `/calling/query/number/[number]` | GET |

## App to phone calls

In this scenario, calls originate from an app using the iOS, Android or Javascript SDK and are terminated to the fixed or mobile phone network\*. For additional call control, you can configure a callback URL under your app’s voice settings in the Sinch dashboard, where Sinch will send call-related events. By capturing and responding to these events from your app, you can allow or deny calls to go through. Events will also be triggered when the calls are answered or disconnected.

For more information please check the [Callback API](rest-api/callback-api.md). The callback events that are used in app to phone calls are the _Incoming Call Event_ callback, the _Answer Call Event_ callback and the _Disconnect Call Event_ callback. You can also manage an ongoing call from your app with the Manage Call API, which is part of the [Calling API](rest-api/calling-api.md).

## App to App calls

In this scenario, calls originate from and are terminated to an app using the iOS, Android or Javascript SDK. Both call legs are established over the data connection of the smartphone or computer (VoIP). For additional call control, you can specify a callback URL where Sinch will send call-related events. By capturing and responding to these events from your app you can allow, deny, and control the calls. You can configure the call back URL under your app’s voice settings in the Sinch [dashboard](https://portal.sinch.com/#/login).

For more information please check the [Callback API](rest-api/callback-api.md). The callback event that's used in app to app calls is the _Incoming Call Event_ callback.

## Phone to phone calls

In this scenario, calls originate from a voice number and are terminated to the fixed or mobile phone network. You can rent and configure voice numbers from the Sinch [dashboard](https://portal.sinch.com/#/login) by following these steps:

1. Rent a Voice number from the Sinch [dashboard](https://portal.sinch.com/#/login), under the _Numbers_ tab.
2. Assign the number to your application. Under the _Apps_ tab, select your app and assign the number under the app Voice settings. Alternatively, you can rent and configure numbers with REST APIs. For more information please check the[Number Administration documentation](number-administration.md).
3. Configure a callback URL under your app’s Voice settings, where Sinch will send call-related events.

When a user calls your configured voice number, the Sinch platform will trigger an _Incoming Call Event_ callback towards your callback URL. The destination number - where the call will be connected to - has to be specified in your response to the _Incoming Call Event_ callback. Similarly to app to phone calls, the Sinch platform will trigger additional events for call control.

For more information please check the [Callback API](rest-api/callback-api.md). The callback events that are used in phone to phone calls are the _Incoming Call Event_ callback, the _Answer Call Event_ callback and the _Disconnect Call Event_ callback. You can also manage an ongoing call from your app with the Manage Call API, which is part of the [Calling API](rest-api/calling-api.md).

## Conference calls

The Sinch dashboard supports a variety of different ways of initiating a conference call and connecting participants.

By using the Sinch Voice SDKs, you can allow your users to call in a conference from a mobile or web app. For more information please check the Voice SDKs documentation.

If you haven't specified a callback URL under your app settings for voice, the participants will be directly added to the conference that's uniquely identified by the conference ID specified in the SDK client method.

If you have specified a callback URL under your app settings for voice, an _Incoming Call Event_ callback will be triggered towards your URL, containing information on the conference ID that the caller wants to connect to. By responding to this event you can allow or deny the connection to the conference, or even specify a different conference ID.

You can also allow users to dial in a conference by calling a fixed phone number. To do this, first follow the steps mentioned in [Phone to phone calls](#phone-to-phone-calls) to configure a number in your app and set a callback URL. Every time a user calls your configured number, an _Incoming Call Event_ callback will be triggered towards your URL. By responding to this event with the `ConnectConf` action, you can connect the call to a conference.

For more information check the [Incoming Call Event](rest-api/callback-api.md#incoming-call-event-callback-ice) callback and the [ConnectConf](rest-api/callback-api.md#connectconf) action.

By using the conference callout API, you can trigger calls to fixed or mobile phones and connect them all to the same conference room.

The Sinch dashboard allows you to control an ongoing conference through REST APIs. There are several conference-control options available, such as muting/unmuting participants or kicking out a participant or all participants from the conference when the conference ends.

For more information check the conferencing APIs that are available under the [Calling API](rest-api/calling-api.md) .

The Sinch dashboard allows recording of conference calls. The recorded files are stored in your own Amazon S3 bucket. For more information on how to record a conference, please check the `ConnectConf` action in the [Callback API](rest-api/callback-api.md).

Conference recording is disabled by default. To enable conference recording for your account please contact Sinch support, providing your Amazon S3 bucket information, where the recordings will be stored.

## Text to speech calls

With the text-to-speech REST API, you can trigger a call to be placed to a fixed or mobile phone number and play a synthesized text message.

For more information please check the [Callouts API](rest-api/calling-api.md#conference-and-text-to-speech-callouts).
