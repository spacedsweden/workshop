---
title: Push Notifications and CallKit
description: Using VoIP push notifications and _CallKit_ with the Sinch SDK.
redirectFrom:
  - /docs/voice-ios-push-notifications-callkit
---

Use the Sinch SDK together with Apple _VoIP_ push notifications and [CallKit](https://developer.apple.com/documentation/callkit) to provide the best possible end user experience. _VoIP_ push notifications are a special type of push notifications that Apple support as part of _Apple Push Notification service_ (_APNs_) which enables fast and high-priority notifications. [CallKit](https://developer.apple.com/documentation/callkit) is an iOS framework that lets you integrate the Sinch VoIP calling functionality with a iOS native system look and feel.

To fully enable VoIP push notifications in your application, the following steps are required:

- Configure your iOS app to use VoIP push notifications and _CallKit_.
- Create and upload an _APNs VoIP Services Certificate_ for your _Sinch Application_ in the _Sinch Developer Portal_.
- Configure `SINClient` to let Sinch manage push notifications (both client-side and server-side).
- Integrate use of Sinch push APIs with _CallKit_.
- Ensure [APNs environment](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment) is matching the app entitlements and code signing.

> ❗️Important
> For iOS apps built using the iOS 13 SDK or later, using _PushKit_ requires you to use _CallKit_ when handling VoIP calls.

## Configure iOS App with Push Notifications Capability

iOS apps must have the proper entitlements to use push notifications. To add these entitlements to your app, enable the _Push Notifications_ capability in your Xcode project. See Apple documentation [here](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns?language=objc#overview) for details on this particular step.

## Acquiring a Push Device Token

`SINManagedPush` is a component used to simplify acquiring a push device token and registering the token with a `SINClient`. `SINManagedPush` will make use of _PushKit_ to acquire a push device token, and will automatically register the token with the `SINClient` when a client is created, later in the application life-cycle. `SINManagedPush` should be created as early as possible in the application’s life-cycle.

```objectivec
@interface AppDelegate () <SINManagedPushDelegate>
@property (nonatomic, readwrite, strong) id<SINManagedPush> push;
@end

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)options {

    self.push = [Sinch managedPushWithAPSEnvironment:SINAPSEnvironmentDevelopment];
    self.push.delegate = self;

    [self.push setDesiredPushType:SINPushTypeVoIP];
}
```

> 📘
>
> When creating the `SINManagedPush` instance, the _Apple Push Notification service Environment_ must be specified and it must __match__ how your application is code signed and provisioned. Please see the section [APS Environments and Provisioning](#apple-push-service-environments-and-provisioning) for details.
> 👍
>
> `SINManagedPush` is a very lightweight component and its lifecycle can be independent of the life-cycle of a `SINClient`. It should be created once, and shouldn't be disposed as that would prevent receiving push notifications via _PushKit_.

## Enabling Push Notifications for `SINClient`

Sinch can manage push notifications for you end-to-end, on both client-side and server-side, acting as [APNs Provider](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns?language=objc). It's necessary to enable that when configuring a `SINClient`.

```objectivec
id<SINClient> client = [Sinch clientWithApplicationKey:@"<application key>"
                                       environmentHost:@"clientapi.sinch.com"
                                                userId:@"<user id>"];

[client enableManagedPushNotifications];
```

## Configuring Apple Push Notification Certificates

Sending and receiving push notifications via Sinch requires you to create Apple APNs push certificates and upload them to the Sinch dashboard.

### Generating Apple Push Certificates

Apple Push Certificates are generated from the [Apple Developer Member Center](https://developer.apple.com/account/resources/certificates/list) which requires a valid _Apple ID_ to login. If you don't have this information, find out who manages the Apple Developer Program for your organization.

1. Go to [Create a New Certificate](https://developer.apple.com/account/resources/certificates/add) in the _Apple Developer_ web portal.
2. Under _Services_, select type _VoIP Services Certificate_
3. Continue the steps as instructed by the Apple Developer guide, and download the certificate file, it will typically be named `voip_services.cer`.

#### Exporting the `.cer` certificate file as a `.p12` bundle

1. Open the `.cer` file and it will be opened in the _macOS_ _Keychain Access_ application.
2. Fold out the drop-down for the selected certificate and you should see the associated private key.
3. Select both the certificate and the private key, right click and select _Export 2 items..._.
4. Select destination path, and click _Save_. You will be prompted for a passphrase. Enter a strong passphrase and press _OK_.
5. You should now have a `.p12` file ready to be uploaded to the Sinch dashboard.

### Setting up your Apple Push Certificates with Sinch

> - Login to the [Dashboard](https://portal.sinch.com/#/dashboard).
> - Open the _Apps_ tab, click on the name of _Application_ you want to configure, then select _Push Configuration_ (top-left in the tabs menu).
> - Drag and drop the certificates associated to your application.
> - If your certificate has a password, enter it and hit Enter.

Your push notification certificates are now uploaded and ready for use.

Certificates configured with Sinch can be replaced or renewed by uploading new ones. New certificates will automatically replace the previous ones for their respective type (_Development_, _Production_ and _VoIP Services_).

### Possible Scenarios of Configuring Your Application

Depending on your use case, it's possible to configure calling functionality differently. Let's consider two possible scenarios:

1. Single Sinch Application, multiple iOS apps (multiple different Bundle IDs)
1. Multiple Sinch Applications, one iOS app (one Bundle ID)
1. Multiple Sinch Applications, multiple iOS app (different Bundle ID)

#### Single Sinch Application, multiple iOS apps (multiple different Bundle IDs)

Suppose you have App-A and App-B with `A-BundleID` and `B-BundleID` iOS bundles respectively.
You want App-B to be able to call App-A. You need to generate *VoIP certificate* for the app with `A-BundleID` and upload it to *Sinch Developer Portal* for the *Sinch Application* which application key you are going to use in both iOS apps.

> ⚠
> Note that both iOS apps should be signed using either *Apple Development Certificate* or *iOS Distribution Certificate*. Chosen certificate **must match** ANPS environment settings provided to Sinch SDK when `SINManagedPush` is created. If you sign using *Apple Development Certificate*, please provide `SINAPSEnvironmentDevelopment`. If you sign using *iOS Distribution Certificate*, please provide `SINAPSEnvironmentProduction`.

Mismatch in APNs environment settings and signing identity in one or both iOS apps will result in the inability to make a call from App-B to App-A.

#### Multiple Sinch Applications, one iOS app (one Bundle ID)

Suppose there're two Sinch Apps (in Sinch Portal), App-A and App-B and only one iOS app. The iOS app could be built with the App-A application key or App-B application key.

If you want to make a call from the iOS app with the App-A application key to iOS app with the App-B application key, you need to generate a VoIP certificate for the iOS app bundle ID and upload it to the caller app in *Sinch Developer Portal*.

In our example you will upload VoIP certificate to App-A in the portal.

> ⚠
> Note that both iOS apps should be signed using either *Apple Development Certificate* or *iOS Distribution Certificate*. Chosen certificates must match the ANPS environment setting provided to Sinch SDK when `SINManagedPush` is created. If you sign using *Apple Development Certificate*, please provide `SINAPSEnvironmentDevelopment`. If you sign using *iOS Distribution Certificate*, please provide `SINAPSEnvironmentProduction`.

#### Multiple Sinch Applications, multiple iOS app (different Bundle ID)

Suppose there're two Sinch Apps (in Sinch Portal), App-A and App-B and two iOS apps with BundleID1 and BundleID2. Each iOS app uses its own Sinch App, with the following configuration:

- iOS app with BundleID1 is built with the App-A application key
- iOS app with BundleID2 is built with App-B application key

If you want to make a call (and receive VoIP background pushes) from one iOS app to the other, you have to generate VoIP certificate for the *callee* app BundleID and upload it to to Sinch portal for the *caller* app, i.e.:

- if you want to make calls from the iOS app with BundleID1 to iOS app with BundleID2 you need to generate VoIP certificate for the BundleID2 and upload it to Sinch Portal for App-A
- if you want to make calls from the iOS app with BundleID2 to iOS app with BundleID1 you need to generate VoIP certificate for BundleID1 and upload to Sinch Portal for App-B.

> ⚠
> Note that both iOS apps should be signed using either *Apple Development Certificate* or *iOS Distribution Certificate*. Chosen certificates must match the APNS environment setting provided to Sinch SDK when `SINManagedPush` is created. If you sign using *Apple Development Certificate*, please provide `SINAPSEnvironmentDevelopment`. If you sign using *iOS Distribution Certificate*, please provide `SINAPSEnvironmentProduction`.

## CallKit

### Apple Requirements on Use of VoIP Push Notifications and _CallKit_

Apple introduced stricter requirements for using VoIP push notifications since iOS 13. iOS apps built using the iOS 13 SDK and making use of VoIP push notifications must report each received push notification as an incoming call to CallKit.

When linking against the iOS 13 SDK or later, your implementation **must** report notifications to the CallKit framework by calling the method [`-[CXProvider reportNewIncomingCallWithUUID:update:completion:]`](https://developer.apple.com/documentation/callkit/cxprovider/1930694-reportnewincomingcallwithuuid). Further, it must report this __within the same run-loop__, before the delegate method invocation scope `-[PKPushRegistryDelegate pushRegistry:didReceiveIncomingPushWithPayload:forType:withCompletionHandler:]` ends. In terms of the Sinch SDK, this means your implementation must report to CallKit in your implementation of  `-[SINManagedPushDelegate managedPush:didReceiveIncomingPushWithPayload:forType:]`.

```objectivec

// (Assuming CallKit CXProvider accessible as self.provider)

- (void)managedPush:(id<SINManagedPush>)managedPush
    didReceiveIncomingPushWithPayload:(NSDictionary *)payload
                              forType:(NSString *)pushType {

  id<SINNotificationResult> notification = [SINPushHelper queryPushNotificationPayload:payload];

  if ([notification isValid] && [notification isCall]) {
    NSUUID *callId = [[NSUUID alloc] initWithUUIDString:notification.callResult.callId];

    CXCallUpdate *callUpdate = [[CXCallUpdate alloc] init];
    callUpdate.remoteHandle = [[CXHandle alloc] initWithType:CXHandleTypeGeneric value:notification.callResult.remoteUserId];

    [self.provider reportNewIncomingCallWithUUID:callId
                                          update:callUpdate
                                          completion:^(NSError *_Nullable error) {
                                            if (error) {
                                              // Hangup call
                                            }
                                          }];
  }
}

// (For a more complete example, see the Sinch sample app SinchCallKit.xcodeproj)
```

When you relay the push notification to a `SINClient` and if you some reason you don't relay the push payload to a Sinch client instance using `-[SINClient relayRemotePushNotification:]`, you __must__ instead invoke `-[SINManagedPush didCompleteProcessingPushPayload:]` so that the Sinch SDK can invoke the _PKPushKit_ completion handler (which is managed by `SINManagedPush`).

> ❗️Report Push Notifications to CallKit
> If a VoIP push notification is not reported to CallKit then iOS will __terminate__ the application. Repeatedly failing to report calls to CallKit may cause the system to stop delivering any more VoIP push notifications to your app. The exact limit before this behavior kicks in is subject to Apple iOS implementation details and outside the control of the Sinch SDK.
>
> Please also see [Apples Developer documentation on this topic](https://developer.apple.com/documentation/pushkit/pkpushregistrydelegate/2875784-pushregistry).

### Extracting Call Information From a Push Payload

At the time when your application receives a push notification you will need to extract some key information about the call based on only the push notification payload. You will need to do this to conform with with Apple requirements on reporting a VoIP push notification as an incoming call to _CallKit_, but you may also want to extract application-specific headers for the call. Use the method `+[SINPushHelper queryPushNotificationPayload:]` to extract call details from the raw push payload. You can do this immediately and before you have created and started a `SINClient` instance.

__Example__

```objectivec

- (void)managedPush:(id<SINManagedPush>)managedPush
    didReceiveIncomingPushWithPayload:(NSDictionary *)payload
                              forType:(NSString *)pushType {

  id<SINNotificationResult> notification = [SINPushHelper queryPushNotificationPayload:payload];

  if ([notification isValid]) {
    id<SINCallNotificationResult> callNotification = [notification callResult];

    // Use SINCallNotificationResult to extract remote User ID, call headers, etc.
  }

```

Also see reference documentation for [SINManagedPush](https://sinch.github.io/docs/voice/voice-for-ios/reference/html/Protocols/SINManagedPush.html) and [SINCallNotificationResult](https://sinch.github.io/docs/voice/voice-for-ios/reference/html/Protocols/SINCallNotificationResult.html).

## Unregister a Push Device Token

If the user of the application logs out or performs a similar action, the push notification device token can be unregistered using the method `-[SINClient unregisterPushNotificationDeviceToken]` to prevent further notifications to be sent to the particular device.

## Push Notification _"Display Name"_

To support showing a user display name in a non-VoIP push notification (for instance, in a regular _Remote Push Notification_), you can configure a display name using [`-[SINManagedPush setDisplayName:]`]. The display name will be available to in the push notification in `aps.alert.loc-args` (when key `aps.alert.loc-key` is `SIN_INCOMING_CALL_DISPLAY_NAME`).

Example of Sinch push notification payload when display name is specified:

```json
{
   "aps" : {
      "alert" : {
         "loc-key" : "SIN_INCOMING_CALL_DISPLAY_NAME",
         "loc-args" : [ "John Doe"]
      }
   },
   "sin": "<opaque push payload>"
}
```

Example of Sinch push notification payload when display name is __not__ specified:

```json
{
   "aps" : {
      "alert" : {
         "loc-key" : "SIN_INCOMING_CALL"
      }
   },
   "sin": "<opaque push payload>"
}
```

## Apple Push Service Environments and Provisioning

When an iOS application is code signed, the embedded _Provisioning Profile_ will have to match the _Apple Push Notification service Environment_ (also referred to as _APS Environment_) specified in the app [_Entitlements_](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment?language=objc).

This means that how the the app is code signed and what _Provisioning Profile_ is used has an effect on what value should be passed to `+[Sinch managedPushWithAPSEnvironment:]`.

For example, if your application is signed with a _Development_ provisioning profile it will be bound to the APS _Development_ environment. If it’s code signed with a _Distribution_ provisioning profile it will be bound to the APS _Production_ environment.

Typically a _Debug_ build will be code signed with a _Development_ provisioning profile and thus `SINAPSEnvironmentDevelopment` should be used. And typically a _Release_ build will be code signed with a _Distribution_ provisioning profile and thus `SINAPSEnvironmentProduction` should be used. **You are responsible for selecting proper entitlements depending on your build type and signing profile.**

## iOS not Delivering Notifications

Under certain circumstances, iOS won't deliver a notification to your application even if it was received at device/OS level. Note that this also applies to VoIP push notifications. Exact behavior and limits are subject to iOS internal details, but well known scenarios where notifications won't be delivered are:

- The end user has actively terminated the application. iOS will only start delivering notifications to the application again after the user has actively started the application again.
- Your app hasn't been reporting VoIP push notifications to _CallKit_. Please see the separate sections above on how to report VoIP push notifications as _CallKit_ calls.

## Relevant Apple Resources

For more details on Apple _PushKit_ and _CallKit_, see following _Apple Developer Documentation_:

- [PushKit](https://developer.apple.com/documentation/pushkit)
- [CallKit](https://developer.apple.com/documentation/callkit)
- [Responding to VoIP Notifications from PushKit](https://developer.apple.com/documentation/pushkit/responding_to_voip_notifications_from_pushkit)

## SINManagedPush and SINClient Interaction

This section covers details on how `SINManagedPush` and `SINClient` interacts together (automatically).

`SINManagedPush` will make use of `PKPushRegistry` to acquire a push device token. If any `SINClient` instances exist, it will register the token via `-[SINClient registerPushNotificationDeviceToken:type:apsEnvironment:]`, which will in turn register the token with the Sinch backend platform. If no instance of `SINClient` exists when `SINManagedPush` initially acquires the token, it will hold on to the token (in-process memory only) and register it with any `SINClient` that's created later during the whole application life-cycle.
