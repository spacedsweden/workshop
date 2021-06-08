---
title: Use verification-all module to configure multiple methods
next:
  pages:
    - verification-android-phone-numbers
description: >-
  Using common verification configuration parameters for different verification
  methods.
redirectFrom:
  - /docs/verification-android-all
---

# Use verification-all module to configure multiple methods at once

Using common verification configuration parameters for different verification methods.

If your application allows the user to authenticate via various verification methods it might be more readable to initiate the verification using `VerificationInitData` and `CommonVerificationInitializationParameters`.

## VerificationInitData

`VerificationInitData` is simply a structure that holds all common parameters that can be passed to a verification configuration object and additionally, it's a method used to verify the phone number.

```kotlin
private val initData: VerificationInitData
    get() =
        VerificationInitData(
            usedMethod = buttonToMethodMap[methodToggle.checkedButtonId],
            number = phoneInput.editText?.text.toString(),
            custom = customInput.editText?.text.toString(),
            reference = referenceInput.editText?.text.toString(),
            honourEarlyReject = honoursEarlyCheckbox.isChecked,
            acceptedLanguages = acceptedLanguagesInput?.editText?.text.toString().toLocaleList()
        )
```

:::info NOTE:

In case of Android, the only method specific parameter for now is the application hash needed by the SMS method. Method specific builders have been implemented mostly for future development purposes and for usage with single verification methods.

:::

## CommonVerificationInitializationParameters

Contrary to `VerificationInitData` that holds parameters of configuration objects, `CommonVerificationInitializationParameters` collects `Verification` instance properties and is designed to work together with `VerificationInitData`:

```kotlin
val verification = BasicVerificationMethodBuilder.createVerification(
            commonVerificationInitializationParameters = CommonVerificationInitializationParameters(
                globalConfig = app.globalConfig,
                verificationInitData = initData,
                initiationListener = initListener,
                verificationListener = this
            ),
            ///...
```

## Sample

Download the [sample application](https://github.com/sinch/verification-samples/tree/master/Android-Verification-SDK) and decide which `Verification` object creation suits your needs best. The _Verification Sample_ project uses the verification-all module and _VerificationSmsSample_ uses a method specific builder to create SMS verification instances when no other methods are needed.
