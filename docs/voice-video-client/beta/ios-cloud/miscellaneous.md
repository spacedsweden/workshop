---
title: Miscellaneous
description: "Miscellaneous information about Voice for iOS."
redirectFrom:
  - /docs/voice-ios-cloud-miscellaneous
---

# Miscellaneous

## Minimum Requirements

We officially support iOS _10.0_ as iOS _Deployment Target_. You can try older versions but there are no guarantees it will work as expected.

## Note on Sinch.xcframework File Size vs. Linked Size

The _Sinch.xcframework_ file includes a FAT-binary containing the architectures _armv7_, _arm64_, *x86_64*. When linking an application target against the _Sinch.xcframework_ targeting an iOS device, it will add a approximately 9.5MB for _arm64_ and approximately 8MB for _armv7_.

**Example**: Assuming linking _armv7_ and _arm64_ into the final application, it would add approximately 17.5MB to the application.

## Restrictions on User IDs

User IDs **must not** be longer than **255** bytes, **must** only contain URL-safe characters, and restricted to the following character set:

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz0123456789-_=
```

If you need to use _User IDs_ containing characters outside the allowed set above, you could consider _base64_-encoding the raw _User IDs_ using a URL-safe base64 alphabet as described in <https://tools.ietf.org/html/rfc4648#section-5>). Please note how the allowed character set overlaps with the URL-safe base64 alphabet, but does **NOT** allow characters in the **non**-URL-safe alphabet, example `/` (forward slash) and `+` (plus sign).

## Local Database File

Sinch SDK needs a local database file to operate properly. It's located in the application support directory (_NSApplicationSupportDirectory_) in the _sinch/db/rtc/_ subfolder. The application **must not** delete this folder.

## Statistics

The Sinch SDK client uploads statistics to the Sinch servers at the end of a call, a call failure, or similar event. The statistics are used for monitoring of network status, call quality, and other aspects regarding the general quality of the service.

Some of the information is not anonymous and may be associated with the User ID call participants.

The statistics upload is done by the client in the background.

## Xcode and Bitcode Intermediate Representation

The Sinch SDK supports Bitcode intermediate representation.

## App Extensions

_App Extensions_ is a feature introduced in iOS 8. App extensions are compiled into executables that are separate from the main application executable. The Sinch SDK are using parts of the iOS SDK APIs that are unavailable to app extensions, thus it’s not supported to use the Sinch SDK in an app extension.

## Linking Against the C++ Standard Library

Since Sinch SDK version 3.4.0, it's required to link against _libc++_. Though if your application is also dependent on _libstdc++_ (which is now considered deprecated by Apple for use on iOS), you can actually link against both _libc++_ and _libstdc++_ by passing the following linker flags:

- Other Linker Flags -> `-ObjC -Xlinker -lc++ -Xlinker -lstdc++`

## Encryption Export Regulations

Please see [Encryption and Export Administration Regulations (EAR)](https://www.bis.doc.gov/index.php/policy-guidance/encryption) and ensure that, if applicable, your application is registered for encryption regulations.

## Deprecated Features and APIs

### Active Connection in Background

Apple has since iOS 10 discontinued support for maintaining a _VoIP_ control connection alive via `-[UIApplication setKeepAliveTimeout:handler:]`. Attempting to use this method on an iOS device running iOS 10 results in the following warning log: `Legacy VoIP background mode is deprecated and no longer supported`. The Sinch feature _Active connection in background_ was using the keep alive handler API and is as a consequence no longer supported on iOS. it's recommended to use [VoIP Push Notifications and CallKit](push-notifications-callkit.md) to achieve the equivalent functionality.

### Missed Call Push Notifications

Sinch SDK primarily use VoIP push notifications. Since iOS 13, Apple and iOS imposed stricter limitations and requirements on how each VoIP push notification that an application receive must be reported to _CallKit_ as an incoming call. This has the implication that Sinch SDK no longer supports separate "Missed Call" push notifications.

We recommend using your own non-VoIP push notification mechanism to deliver "Missed Call" push notifications.

Please also see [Apple Developer documentation on this topic](https://developer.apple.com/documentation/pushkit/pkpushregistrydelegate/2875784-pushregistry).
