---
title: The verification process
description: >-
  The verification process in the JVM Verification SDK. It's performed in two
  steps: requesting a verification code and verifying the received code. This
  can be done through SMS, flash calls, callouts and seamlessly.
redirectFrom:
  - /docs/verification-jvm-the-verification-process
---

# The verification process

The verification process in the JVM Verification SDK. It's performed in two steps: requesting a verification code and verifying the received code. This can be done through SMS, flash calls, callouts and seamlessly.

Verification of a phone number is performed in two steps: requesting a verification code and verifying the received code.
In JVM SDK the code needs to be manually passed to the verification object by calling the `verify` method.

Depending on the method the code is:

1. SMS - 4 Digits number received in text message.
2. Flashcall - Full number of the incoming call. (formatted according to [E.164](http://en.wikipedia.org/wiki/E.164) specification and prefixed with `+`).
3. Callout - The code is spoken by text-to-speech software after picking up the incoming phone call.
4. Seamless - The only method that's fully automatic. No manual actions are necessary, however mobile data connection must be enabled for this method to work.

During the process of every verification, SDK will callback first to the `InitiationListener` (with the result of the verification request) and then to the `VerificationListener` (result of specific code verification), see [InitiationListener](#initiation-listener) and [VerificationListener](#verification-listener) for more information.

## Creating a Verification

To initiate a verification process a `Verification` object needs to be created. This can be accomplished by calling VerificationMethod builder, passing configuration object instance and optionally initiation and verification listeners.

```java
val verification = VerificationMethod.Builder.instance
            .verificationConfig(verificationConfig)
            .verificationListener(this)
            .initiationListener(this)
            .build()
```

[Fluent Builder Pattern](https://dzone.com/articles/fluent-builder-pattern) is used for every object creation so the process should be self explanatory and straightforward.

### Verification configuration objects

Every verification method requires a specific configuration object to be passed during the building process. Similarly to creating a verification this is done by calling VerificationMethodConfig Builder and passing the arguments requested by the [Fluent Builder Pattern](https://dzone.com/articles/fluent-builder-pattern).

```java
val verificationConfig = VerificationMethodConfig.Builder.instance
            .authorizationMethod(AppKeyAuthorizationMethod(appKey = "***"))
            .verificationMethod(method)
            .number(phoneNumber)
            .build()
```

### Verification Language

Although it possible to specify the language that will be used during the verification process, currently only sms method supports this feature. In order to to that, a list of `VerificationLanguage` objects should be passed to the configuration builder.

```java
val topPriorityLanguage = VerificationLanguage(language = "pl", region = "PL", weight = 1)
val secondaryLanguage = VerificationLanguage(language = "es", region = "ES", weight = 0.33)
val verificationConfig = VerificationMethodConfig.Builder.instance
            .authorizationMethod(AppKeyAuthorizationMethod(appKey = "***"))
            .verificationMethod(method)
            .number(phoneNumber)
            .acceptedLanguages(listOf(topPriorityLanguage, secondaryLanguage))
            // Other optional arguments
            .build()
```

See [IETF](https://tools.ietf.org/html/rfc3282) language tags to find all possible values that can be passed as region and language parameters of `VerificationLanguage` constructor. The weight argument should be within range 0–1 (lowest to highest priority). To find out what language was actually selected check `contentLanguage` property of `SmsInitiationResponseData` passed to `onInitiated` callback of the initiation listener.

:::info Note

The content language specified can be overridden by carrier provider specific templates, due to compliance and legal requirements, such as [US shortcode requirements (pdf)](https://www.wmcglobal.com/storage/us_resources/ctia-short-code-monitoring-handbook-current-Short-Code-Monitoring-Handbook-v1.7.pdf).

:::

### Initiating the verification process

After creating a verification method object instance simply call it's `initiate` method to start the verification process.

## Initiation listener

The `InitiationListener` provides callbacks during the initiation phase of the verification process (requesting the verification code). If initiation is successful, the `onInitiated` callback is triggered passing the initiation data (such as selected verification language, sms template, incoming call mask or verification id).
Afterwards SDK waits for manual code input via the `verify` method.
If initiation fails, the `onInitializationFailed` callback runs and the exception describing the error is passed.

## Verification listener

The `VerificationListener` provides callbacks for the second stage of the verification process - checking if passed code is correct. If it's the `onVerified` callback is called. If it's not or some other error occurs `onVerificationFailed` callback runs and the exception describing the error is passed.

## Early reject.

If Sinch knows that verification is most likely to fail, an application can be configured to catch this condition and provide means to fallback fast to other verification methods. In this case the verification listener `onInitializationFailed` callback will be executed with an instance of `ApiCallException`. To enable this feature contact us at <dev@sinch.com>

## Pass data to your backend

For each call to `Verification.initiate`, the Sinch backend can perform a callback to the application backend to allow or disallow verification being initiated. By using the optional parameter `custom` on method configuration objects any unique identifier can be passed from the application to the application backend. The data will be passed as a string. If there is a need for a more complex datatype, it needs to be stringified or encoded before being sent.
