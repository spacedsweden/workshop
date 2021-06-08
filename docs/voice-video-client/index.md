---
title: Introduction
description: >-
  Sinch offers a platform for real-time communication over the Internet. It
  consists of different software development kits – the Sinch SDKs. Find out
  more now.
background: voice/voiceHero.svg
enableToc: false ##should be disabled default for product landing page
productLandingPage: true
hero:
  title: Voice and Video Clients
  description: Make and receive voice and video calls in your application with our SDKs
  enabled: true
  mainActionLabel: Read more
  mainActionTarget: ./using-rest.md
  smallCard: ##the four or so links under hero
    - page: /docs/voice/tutorials/
      description: Learn how to build voice and video solutions for different usecases
      title: Tutorials
    - page: /docs/voice/rest-api/voice/tag/Calling-API/
      description: Read the full API specification
      title: API Reference
    - page: /docs/voice-video-client/
      description: Learn how to build iOS and Android Video and calling apps
      title: Building VoIP apps
redirectFrom:
  - /docs/voice-introduction
---

# Introduction

Sinch offers a platform for real-time communication over the Internet. It consists of different software development kits–the Sinch SDKs–that you integrate with your smartphone or web application and cloud-based backend services. Together, they enable Voice-based communication in your application.

Apart from real-time communication between smartphone or web applications, our backend services also integrate with the public switched telephone network(PSTN) in the form of high quality voice termination at low rates, making it possible to connect calls to any phone number in more than 150 countries.

## What are the different voice services?

When using Sinch for Voice calling, the Sinch platform can be seen as a big telephony switch. It receives incoming phone calls, sets up outgoing phone calls and bridges the two. The incoming call may come from a mobile or web application (over data) or through a local phone number. Similarly, the outgoing call can be terminated to another mobile or web application (over data) or to a phone number (via the PSTN network), hence the following classification:

- App to app calling
- App to phone calling
- Phone to phone calling

## What are the supported platforms?

The Sinch SDK is currently available for [iOS](./ios.md), [Android](./android.md) and [JavaScript](./js.md) platforms and most of the Sinch back-end services are also exposed over [REST APIs](./rest-api.md), primarily for back-end to back-end integration.

## How do I get started?

Getting started with the Sinch Voice API and SDK is simple thanks to the extensive documentation for each platform and the different tutorials and sample application available together with the SDKs. In most cases, Sinch can be used without needing a backend or any configuration just follow these steps.

1. [Create an account](https://portal.sinch.com/#/signup),
2. [Download the Sinch Voice SDK](https://sinch.readme.io/page/downloads)

And get started in minutes following one of the user guides below.

- [iOS](ios-cloud.md)
- [Android](android-cloud.md)
- [JavaScript](voice-for-js.md)

## Need help?

If you have any questions, feel free to check out our help section or contact us.
