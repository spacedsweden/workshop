---
title: Sinch iOS Verification SDK first time set up
next:
  pages:
    - verification-ios-process
description: null
redirectFrom:
  - /docs/verification-ios-first-time-setup
---
# Sinch iOS Verification SDK first time set up

null

This guide will show you how to set up the Sinch Verification SDK for the first time.

## Register an Application

1. Register a Sinch Developer account [here](https://portal.sinch.com/#/signup).
2. Set up a new Application using the Dashboard where you can then obtain an **Application Key**.
3. Enable Verification for the application by selecting: **Authentication** > **Public** under **App** > **Settings** > **Verification**

## CocoaPods

The Sinch Verification SDK can be downloaded via CocoaPods. To integrate it, simply include in your Podfile:

      pod 'SinchVerificationSDK', '~> 3.1.0'
