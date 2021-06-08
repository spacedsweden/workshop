---
title: Video Calling
next:
  pages:
    - voice-ios-cloud-push-notifications-callkit
description: Set up video calls with the Sinch iOS Voice & Video SDK.
redirectFrom:
  - /docs/voice-ios-cloud-video-calling
---

# Video Calling

Set up video calls with the Sinch iOS Voice & Video SDK.

## Setting Up a Video Call

Just like audio calls, video calls are placed through the `SINCallClient` and events are received using the `SINCallClientDelegate` and `SINCallDelegate`. For a more general introduction to calling and `SINCallClient`, see [Calling](calling.md).

Before you start, ensure your application is [requesting user permission for using the video camera](video-calling.md#request-user-permission-for-using-the-camera).

## Showing the Video Streams

The following examples for showing video streams will be based on the assumption of a view controller having the following properties:

```objectivec
@interface MyViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIView *remoteVideoView;
@property (weak, nonatomic) IBOutlet UIView *localVideoView;

@end
```

### Showing a Preview of the Local Video Stream

The locally captured stream is rendered into the view provided by [`-[SINVideoController localView]`](reference\html\Protocols\SINVideoController.html) when it's attached to the application UI view hierarchy.

```objectivec
- (void)viewDidLoad {
  [super viewDidLoad];

  id<SINVideoController> videoController = ... // get video controller from SINClient.

  [self.localVideoView addSubview:[videoController localView]];
}
```

### Showing Remote Video Streams

Once the remote video stream is available, the delegate method `-[SINCall callDidAddVideoTrack:]` will be called and you can use that to attach the Sinch video controller view ([`-[SINVideoController remoteView]`](reference\html\Protocols\SINVideoController.html)) to your application view hierarchy so that the stream is rendered.

```objectivec
- (void)callDidAddVideoTrack:(id<SINCall>)call {
  id<SINVideoController> videoController = ... // get video controller from SINClient.

  // Add the video views to your view hierarchy
  [self.remoteVideoView addSubview:[videoController remoteView]];
}
```

(The remote stream will automatically be rendered into the view provided by `-[SINVideoController remoteView]`.)

### Pausing and Resuming a Video Stream

To pause the local video stream, use the method `-[SINCall pauseVideo]`. To resume the local video stream, use the method `-[SINCall resumeVideo]`.

```objectivec
// Pause the video stream.
[call pauseVideo];

// Resume the video stream.
[call resumeVideo];
```

The call delegate will be notified of pause- and resume events via the delegate callback methods `-[SINCallDelegate callDidPauseVideoTrack:]` and `-[SINCallDelegate callDidResumeVideoTrack:]`. it's for example appropriate to based on these events update the UI with a pause indicator, and subsequently remove such pause indicator.

### Video Content Fitting and Aspect Ratio

How the rendered video stream is fitted into a view can be controlled by the regular property `UIView.contentMode`. I.e. assigning `contentMode` on a view returned by `-[SINVideoController remoteView]` or `-[SINVideoController localView]` will affect how the video content is laid out. Note though that only `UIViewContentModeScaleAspectFit` and `UIViewContentModeScaleAspectFill` will be respected.

**Example**

```objectivec
id<SINVideoController> videoController = ... // get video controller from SINClient.

[videoController remoteView].contentMode = UIViewContentModeScaleAspectFill;
```

### Full Screen Mode

The Sinch SDK provides helper functions to transition a video view into fullscreen mode. These are provided as Objective-C category methods for the `UIView` class and are defined in `SINUIView+Fullscreen.h` (`SINUIViewFullscreenAdditions`).

**Example**

```objectivec
- (IBAction)toggleFullscreen:(id)sender {
    id<SINVideoController> videoController = ... // get video controller from SINClient.

    UIView *view = videoController.remoteView;

    if ([view sin_isFullscreen]) {
      view.contentMode = UIViewContentModeScaleAspectFit;
      [view sin_disableFullscreen:YES]; // Pass YES to animate the transition
    } else {
      view.contentMode = UIViewContentModeScaleAspectFill;
      [view sin_enableFullscreen:YES];  // Pass YES to animate the transition
    }
  }
```

### Camera Selection (Front/Back)

Select the front or back camera using `-[SINVideoController captureDevicePosition:]`.

**Example**

```objectivec
- (IBAction)onUserSelectedBackCamera:(id)sender {
  id<SINVideoController> videoController = ... // get video controller from SINClient.

  videoController.captureDevicePosition = AVCaptureDevicePositionBack;
}

- (IBAction)onUserSelectedFrontCamera:(id)sender {
  id<SINVideoController> videoController = ... // get video controller from SINClient.

  videoController.captureDevicePosition = AVCaptureDevicePositionFront;
}
```

### Accessing Raw Video Frames from Remote and Local Streams

The Sinch SDK provides access to the raw video frames of the remote and local video streams. This allows you to process the video frames with your own implementation to achieve rich functionalities, example applying filters, adding stickers to the video frames, or saving a frame as an image.

Perform custom video frame processing by implementing `SINVideoFrameCallback` and register it using `-[SINVideoController setRemoteVideoFrameCallback:]` and `-[SINVideoController setLocalVideoFrameCallback:]`. The callback handler will provide the frame in the form of a [`CVPixelBufferRef`](https://developer.apple.com/documentation/corevideo/cvpixelbuffer?language=objc), and a completion handler block that you **must** invoke, passing the processed output frame (also as a `CVPixelBufferRef`) as argument. The implementation of the frame callback hander **must** retain (and release) the buffer using [CVPixelBufferRetain](https://developer.apple.com/documentation/corevideo/1563590-cvpixelbufferretain?language=objc) and [CVPixelBufferRelease](https://developer.apple.com/documentation/corevideo/1563589-cvpixelbufferrelease?language=objc).

**Example:**

```objectivec
// Implementation of -[SINVideoFrameCallback onFrame:completionHandler:]
- (void)onFrame:(CVPixelBufferRef)pixelBuffer completionHandler:(void (^)(CVPixelBufferRef))completionHandler {
  if (!pixelBuffer)
    return;

  CVPixelBufferRetain(pixelBuffer);

  // it's important to dispatch the filter operations in a different thread,
  // so the SDK won't be blocked while the filter is being applied.
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
    CIImage *sourceImage = [CIImage imageWithCVPixelBuffer:(CVPixelBufferRef)pixelBuffer options:nil];
    CGRect sourceExtent = sourceImage.extent;

    CIFilter *vignetteFilter = [CIFilter filterWithName:@"CIVignetteEffect"];

    [vignetteFilter setValue:sourceImage forKey:kCIInputImageKey];
    [vignetteFilter setValue:[CIVector vectorWithX:sourceExtent.size.width / 2 Y:sourceExtent.size.height / 2]
                      forKey:kCIInputCenterKey];
    [vignetteFilter setValue:@(sourceExtent.size.width / 2) forKey:kCIInputRadiusKey];
    CIImage *filteredImage = [vignetteFilter outputImage];

    CIFilter *effectFilter = [CIFilter filterWithName:@"CIPhotoEffectInstant"];
    [effectFilter setValue:filteredImage forKey:kCIInputImageKey];
    filteredImage = [effectFilter outputImage];

    CIContext *ciContext = [CIContext contextWithOptions:nil];
    [ciContext render:filteredImage toCVPixelBuffer:pixelBuffer];

    // Send processed CVPixelBufferRef back
    if (completionHandler) {
      completionHandler(pixelBuffer);
    } else {
      NSLog(@"completionHandler is nil!");
    }
    CVPixelBufferRelease(pixelBuffer);
  });
}

```

**NOTE**: it's recommended to perform frame processing asynchronously using [GCD](https://developer.apple.com/documentation/dispatch?language=objc), using a dedicated queue and tune the queue priority to your use case. If you are processing each and every frame (example applying a filter), it's recommended to use a high priority queue. If you are only processing some frames, example saving snapshot frames based on user action, then it may be more appropriate to use a low priority background queue.

**NOTE**: the approach shown in the example above might provoke a crash on older iOS versions (example iOS11.x, iOS12.x) due to a bug in `CoreImage` (see StackOverflow threads [1](https://stackoverflow.com/questions/60646774/why-is-coreimage-cicontext-render-executing-this-exc-bad-access-error-during) and [2](https://stackoverflow.com/questions/57295035/app-crash-when-blurring-an-image-with-cifilter)). If your deployment target is lower than iOS13.0, consider using an image processing library other than `CoreImage`.

### Converting a Video Frame to `UIImage`

The Sinch SDK provides the helper function `SINUIImageFromPixelBuffer(CVPixelBufferRef)` to convert `CVPixelBufferRef` to `UIImage*`.

```objectivec
#import "SINVideoController.h" // To use SINUIImageFromPixelBuffer()

// Get CVPixelBufferRef from -[SINVideoFrameCallback onFrame:completionHandler:] callback
CVPixelBufferRef pixelBuffer = ...
UIImage *image = SINUIImageFromPixelBuffer(pixelBuffer);
```

**IMPORTANT**: The helper function will **not** release the frame buffer (i.e. you must still call `CVPixelBufferRelease` after using this helper function.)

## Request User Permission for Using the Camera

Recording video always requires explicit permission from the user. Your app must provide a description for its use of video camera in terms of the _Info.plist_ key [NSCameraUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nscamerausagedescription).

See the Apple documentation on [`+[AVCaptureDevice requestAccessForMediaType:completionHandler:]`](https://developer.apple.com/documentation/avfoundation/avcapturedevice/1624584-requestaccessformediatype) for details on how to request user permission.
