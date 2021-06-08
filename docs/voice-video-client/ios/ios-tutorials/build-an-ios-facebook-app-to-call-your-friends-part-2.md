---
title: 'Build an iOS Facebook App to Call Your Friends: Part 2'
description: >-
  This tutorial will add feature to the previous tutorial where you learned how
  to call Facebook friends.
redirectFrom:
  - /docs/build-an-ios-facebook-app-to-call-your-friends-part-2
---
In this tutorial, we will be adding a feature to a previous project, the [Facebook friend calling app](build-an-ios-facebook-app-to-call-your-friends.md). If you haven’t already, you can check that tutorial out [here](https://github.com/sinch/ios-call-your-facebookfriends).

The feature we’ll be implementing is displaying user profile images. Once we’re done, the app will look something like this:
![Login.png](images/6ddbdf8-Login.png)

![Call.png](images/be9dd38-Call.png)

## 1. Setup

Download the existing Facebook friend calling app from [Github](https://github.com/sinch/ios-call-your-facebookfriends) and install the necessary pods.

Then, be sure to create an app on your [Sinch Dashboard](https://portal.sinch.com/#/login). Fill in the application key and secret fields in **AppDelegate.m**.

Finally, register your app on the [Facebook Developer Site](https://developers.facebook.com).

## 2. Adding User Profile Picture

First go to **LoginViewController.m** and add the following method:

```objectivec
- (void) displayPictureForUser {
    NSURL *pictureURL = [NSURL URLWithString:[NSString stringWithFormat:@"https://graph.facebook.com/%@/picture?type=large&return_ssl_resources=1", [[FBSDKAccessToken currentAccessToken] userID]]];
    NSData *imageData = [NSData dataWithContentsOfURL:pictureURL];
    UIImage *img = [UIImage imageWithData:imageData];
    CGSize size = img.size;
    CGRect rectFrame = CGRectMake(90, 100, size.width, size.height);
    UIImageView* imgv = [[UIImageView alloc] initWithImage:img];
    imgv.frame = rectFrame;
    [self.view addSubview:imgv];
}
```

Here, we get a user’s profile picture from a URL as data. We then use that data to form a UIImage that we can display in a UIImageView. You can play around with `rectFrame` to get a profile image size and position that suites you.

We’ll call this method in two places, at the beginning of each of the file’s if-statements. Both statements should now look like this:

```objectivec
if ([FBSDKAccessToken currentAccessToken]) {

    [self displayPictureForUser];

    ...

}
```

## 3. Adding Call Profile Picture

This part will be very similar to the previous part, but we’ll do two things differently:

> - We will specify which person’s picture to display as a method parameter
> - The picture will be in a small bubble (for asthetic pleasure of course\!)

In **DetailViewController.m**, add the following method.

```objectivec
- (void) displayPictureForUser:(NSString *)userId {
    NSURL *pictureURL = [NSURL URLWithString:[NSString stringWithFormat:@"https://graph.facebook.com/%@/picture?type=large&return_ssl_resources=1", userId]];
    NSData *imageData = [NSData dataWithContentsOfURL:pictureURL];
    UIImage *img = [UIImage imageWithData:imageData];
    CGSize size = img.size;
    CGRect rectFrame = CGRectMake(130, 130, size.width/2, size.height/2);
    UIImageView* imgv = [[UIImageView alloc] initWithImage:img];
    imgv.frame = rectFrame;

    // make picture into circle
    imgv.layer.cornerRadius = size.width/4;
    imgv.layer.masksToBounds = YES;

    [self.view addSubview:imgv];
}
```

Then, call the method in `viewDidLoad`, which will look something like this:

```objectivec
- (void)viewDidLoad {
    [super viewDidLoad];
    [self displayPictureForUser:[self.detailItem friendID]];

    ...

}
```

That’s it\! Go ahead and test it out. You should be able to see profile pictures in the login screen as well as on the calling screen.
