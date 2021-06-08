---
title: Building an iOS Proximity App
description: >-
  In this tutorial we will be working on a project to integrate Sinch into an
  iOS application. This will let users connect with other users nearby using
  Apple’s multi-peer connectivity framework; once a connection has been made,
  either user will be able to call the other.
---

Thanks to [Zac Brown](https://twitter.com/brownzac1) for writing this tutorial.

Sinch is the easiest way to integrate real-time instant messaging and voice communication into your iOS, Android, and Web applications. Not only does it allow app-to-app communications, but it gives the option to send text messages and make voice calls from within an application to cellular networks. Sinch can easily be added to your project using the SDK for your platform (iOS, Android, and Web) or the Sinch API. Sinch is also now fully compatible with 64-bit architecture on iOS.

Today, we will be working on a project to integrate Sinch into an iOS application. This will let users connect with other users nearby using Apple’s multi-peer connectivity framework; once a connection has been made, either user will be able to call the other. We will achieve this by exchanging userIDs once a connection is established between two devices. This application will also use Parse as a means of managing users, logins, and storage of some basic data.

Check out a few screenshots of what we will be building.
![overview.jpg](images\fd51ff2-overview.jpg)

To complete this tutorial, you will need some basic Objective-C language knowledge. It’s very in-depth and we hope that beginners and intermediate developers are all able to complete this tutorial. You can also download the whole GitHub repo at <https://github.com/sinch/ios-proximity-tutorial/> .

Just for some quick insight, here’s the basic concepts behind the multi-peer connectivity framework. This framework uses pre-existing Wi-Fi networks and Bluetooth to connect one iOS device to another. The platform itself has provisions for the transfer of various file types and also has the ability to stream data from one device to another. Apple’s AirDrop platform is presumably built on none other than the multi-peer framework.

To get started, download the starter project from the GitHub repository, which contains all the storyboards and view controllers to complete this tutorial. Along the way, you may be required to add a few classes, though. We’ve connected all the views and buttons to their respective methods within the code to simplify this tutorial. Once you’ve opened the starter project in Xcode, navigate to www.parse.com. You will need to sign up for a free account, create a project, download the [iOS SDK](https://parse.com/downloads/ios/parse-library/latest), and use the quick-start guide to acquire your App ID and Client ID. Once you have those, take note of them and head over to the Xcode project.

When testing this, you might have trouble finding other devices or attempting to connect to other devices; this mainly occurs when trying to connect through Bluetooth because the AirDrop security settings on one of the devices doesn’t allow every device to connect. If you’re having trouble, swipe up on your iOS device, select AirDrop, and then select ‘Everyone.’ This will allow any other device to connect to yours via AirDrop. Be sure to change the settings back once you’re done testing. If it still isn’t working, make sure that both of the devices’ Bluetooth is set to “on” or that they’re connected to the same Wi-Fi network.
![airdrop.png](images\a96da27-airdrop.png)

There are two methods of adding Parse and Sinch to our project: We can either import them as frameworks or use CocoaPods. For many reasons, CocoaPods is best, mainly because of version compatibility. If you’re unaware of how to use CocoaPods, head over to the [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) site and follow the guides. Once you’ve worked out how to make a Podfile, edit that Podfile and add two pods. The two pods will be Sinch and Parse. The finished Podfile should look like this:

```shell
    target 'SinchMultiPeer' do
    pod 'SinchRTC', '~> 3.5'
    pod 'Parse', '~> 1.7'
    end

    target 'SinchMultiPeerTests' do

    end
```

![podfile.png](images\282d7c0-podfile.png)

After you’ve finished editing the Podfile, be sure to save it and use the cd command in terminal to navigate to your project. Use the command `pod install` to add the finishing touches. Installing the pods could take some time, so be patient. From now on, you will be required to use the .xcworkspaces file to finish your project instead of the .xcodeproj file; make sure to switch over now.

If you do go down the road of adding the files by importing the frameworks, you will need to make some modifications to the linker tags when you add Sinch to the project. Check out the other guides on [Sinch](doc:tutorials-introduction) to get the full instructions on how to go about this.

## Setting up Parse

You will now need to add some local frameworks in Xcode to ensure the Parse framework has the resources to work properly. In the left-hand column of Xcode, navigate to the project settings and at the bottom of the page, you will find a section labeled “Linked Frameworks and Libraries.” Click the “+” symbol and add these frameworks:

> - AudioToolbox.framework
> - CFNetwork.framework
> - CoreGraphics.framework
> - CoreLocation.framework
> - MobileCoreServices.framework
> - QuartzCore.framework
> - Security.framework
> - StoreKit.framework
> - SystemConfiguration.framework
> - libz.dylib
> - libsqlite3.dylib

Your Xcode window should look something like this:
![frameworks.png](images\21f4bb4-frameworks.png)

Now you’re ready to start coding. Navigate over to the AppDelegate.m file. Below ‘\#import “AppDelegate.h”, import the Parse framework so that you can start using it. Add this code:

```objectivec
#import <Parse.Parse.h>
```

That will import the framework and now you will be able to use it in the Appdelegate.h & .m files. Next, navigate to the method didFinishLaunchingWithOptions and add this code, which I’ll explain below:

```objectivec
[Parse setApplicationId:@"YOUR-PARSE-APP-ID" clientKey:@"PARSE-CLIENT-KEY"];
```

This code simply initializes Parse with your specific application IDs and makes a connection between the Parse backend and the iOS client. Make sure they’re correct or else you’re going to have some trouble. The didFinishLaunchingWithOptions method is your first and best chance at initializing these third-party frameworks and doesn’t rely on view controllers being presented, which is why we’ve chosen to place it here. You will need to add your own App ID and client key that you took note of earlier into the code above.

Now, navigate to loginViewController.m, where we will get to work implementing our Parse login. Once again, import the Parse framework into the file; in every file you wish to use Parse, you’re going to have to \#import the framework. Add the following code to the login method already in place (the IBAction method is already connected to the login button) to allow your users to log in. Don’t worry, we will make a sign up screen next.

```objectivec
@implementation loginViewController {
BOOL loggedIn;
}
- (IBAction)login:(id)sender {
NSString *username = _usernameField.text;
NSString *password = _passwordField.text;

[PFUser logInWithUsernameInBackground:username password:password block:^(PFUser *user, NSError *error) {
    if (error) {
        loggedIn = NO;
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error" message:[NSString stringWithFormat:@"%@, Please try again", [error userInfo][@"error"]] delegate:nil cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
        [alert show];
    } else {
        loggedIn = YES;
        [self performSegueWithIdentifier:@"loggedIn" sender:nil];
    }
}];}
- (BOOL)shouldPerformSegueWithIdentifier:(NSString *)identifier sender:(id)sender {
if (loggedIn) {
    return YES;
} else {
    return NO;
    }
}
@end
```

Here you can see I’ve added a loggedIn BOOL to the instance variables of the class, which is used to determine whether the login was successful when shouldPerformSegueWithIdentifier is called. If Parse has successfully logged in, we return yes, which basically tells the app to segue to the next screen. The opposite happens if a login hasn’t occurred. Besides that, I’ve just followed Parse’s login protocol as outlined in the docs.

For simplicity, I’ve created some local NSStrings, which relate to the text from the two textField properties as outlined in the .h file. From those, I’ve called PFUser login, inputted the two variables, and then used a block to determine the outcome of calling login. This is all very simple and Xcode autocompletes the majority of the method. In the block, if there’s an error, we set loggedIn to NO and display an alert, but if it’s successful, we set loggedIn to YES and call for a segue.

Moving on\!

At the moment, users can log in and be presented with the newFriends view controller, but it'sn’t currently possible for them to sign up. It’s time to backtrack and add some sign-up functionality.

Head on over to signUpViewController.m and once again import the Parse framework.

```objectivec
#import <Parse/Parse.h>
```

Now we will add some methods that are very similar to what we added in the login view controller. Once again, I’ve created some local NSStrings that are local copies of the text extracted from the username, password, screen name, and age textfields.

```objectivec
@implementation signUpViewController{
BOOL signedUp;
}
- (IBAction)signUp:(id)sender {
NSString *username = _usernameField.text;
NSString *password = _passwordField.text;
int age = [_ageField.text intValue];
NSString *screenName = _screenName.text;

PFUser *user = [[PFUser alloc] init];
user.username = username;
user.password = password;
user[@"age"] = @(age);
user[@"screenName"] = screenName;

[user signUpInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
    if (error) {
        signedUp = NO;
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error" message:[NSString stringWithFormat:@"%@, Please try again", [error userInfo][@"error"]] delegate:nil cancelButtonTitle:@"ok" otherButtonTitles:nil, nil];
        [alert show];
    } else {
        signedUp = YES;
        [self performSegueWithIdentifier:@"signedUp" sender:nil];
    }
}];}
- (BOOL)shouldPerformSegueWithIdentifier:(NSString *)identifier sender:(id)sender {
if (signedUp) {
    return YES;
} else {
    return NO;
    }
}
@end
```

It’s good practice to run the code in the iOS simulator after each new feature has been added to ensure you don’t have any bugs in the code. It’s much easier to track them after you’ve added each new feature rather than try to track them when you’ve finished an entire project.

There’s already a small bug in place; back in the loginViewController our shouldPerformSegue method works on the condition of whether or not a login has occurred. It’s a given that if someone has pressed the signup button, he or she is more than likely not going to have successfully signed up. We need to establish whether the segue is to sign up or the one that progresses to the main screen, which requires a prior login. In the case of having two segues that we need to control, we must evaluate which segue is trying to occur. We can easily do this in the shouldPerform segue method by querying which identifier has been passed to the method. We now need to go back to loginViewController.m and edit the shouldPerformSegueWithIdentifier method to look something like this:

```objectivec
- (BOOL)shouldPerformSegueWithIdentifier:(NSString *)identifier sender:(id)sender {
if ([identifier isEqualToString:@"loggedIn"]) {
if (loggedIn) {
    return YES;
} else {
    return NO;
}
} else {
    return YES;
}
```

> }

As you can see, we’ve nested the previous if/else within another if/else. We first evaluate if the login segue is trying to occur by seeing if it’s equal to the string ‘loggedIn’. If that’s the identifier, we further evaluate if a login has occurred to warrant the segue. If that'sn’t the identifier, we simply return YES, as there are no prerequisites for the signup screen. It’s important to do this because we can’t let people segue to the main screen before they’ve signed in. If we were to allow this and the signup wasn't successful, our application would more than likely crash when we tried to query the current user.

After testing this, you won'tice a small issue: Although there’s nothing wrong with the code at this point, you will see that there is no way to dismiss the keyboard when attempting to press the login/signup buttons, nor are the buttons visible unless the keyboard is dismissed. It’s pretty simple to fix this; keep in mind that simple problems like this can make or a break an app.

Add this method into both the loginViewController and signupViewController implementation files:

```objectivec
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
[self.view endEditing:YES];
return YES;
}
```

Go ahead and test this. You will find that it won’t work but there’s an easy fix. Set the delegate of the textFields to self (being the current view controller). This is an example of how to set the textField delegates from the login view controller.

```objectivec
- (void)viewWillAppear:(BOOL)animated {
_usernameField.delegate = self;
_passwordField.delegate = self;
}
```

I chose to put the logic within the viewWillAppear method as it’s a given that the method will execute. Delegates are crucial and it’s important to be familiar with them prior to starting the implementation of Sinch into our project later on in the tutorial.

Now go ahead and do the same in the signupViewController. Keep in mind that there are four textFields that need to have their delegates set.

## Adding the multi-peer connectivity framework

Although we can log in and sign up at this point, there isn’t much else we can do. Now it’s time to get to work. First, we will find some friends using the multi-peer framework. Then we will work out how to connect with them using the Sinch SDK.

Before we get to work, take a quick look at the storyboard; it’s like our roadmap. From our login/signup view controllers, you will see a navigation controller. Embedded in our navigation controller is our view controller titled “Chats,” which is connected to the newFriends class. Both our multi-peer and Sinch frameworks will be implemented here. From there, we've two view controllers: our call screen and our incoming call screen. Those should be pretty self-explanatory; they’re both connected to their respective classes.
![storyboard.png](images\ffe55f9-storyboard.png)

To add multi-peer connectivity, add the framework. This can be done in the same place we added all of those frameworks earlier on. Once you’ve done that, head over to newFriends.m and import the framework into the file, like this:

```objectivec
import <MultipeerConnectivity/MultipeerConnectivity.h>
```

Next, we need to create some properties in the interface section of newFriends.m. As you can see here, these are all essential to use the multi-peer connectivity framework.

```objectivec
@interface newFriends ()
@property (nonatomic, retain) MCAdvertiserAssistant *advertiserAssistant;
@property (nonatomic, retain) MCSession *session;
@property (nonatomic, retain) MCPeerID *peerId;
@property (nonatomic, retain) MCBrowserViewController *browserViewController;
@end
```

Here’s a quick rundown of what each property is used for:

**MCAdvertiserAssistant**: Makes your device visible to others while also managing incoming connections

**MCSession**: Enables and manages connections between your device and your peer’s device

**MCPeerID**: A reference for a peer in a session

**MCBrowserViewController**: A ready-made view controller provided by Apple that will present a list of nearby users and allow you to make the connections

At this point, you will need to head over to the newFriend.h file and set this class as a delegate for the MCBrowserViewController and MCSession. This can be achieved by modifying the following line in newFriend.h from this:

```objectivec
@interface newFriends : UITableViewController
```

to
this:

```objectivec
@interface newFriends : UITableViewController <MCBrowserViewControllerDelegate, MCSessionDelegate>
```

See how easy? All we’re doing is saying that the newFriends class conforms to the delegate protocol.

Now you will see a heap of new warnings to notify us that we'ven’t yet implemented the delegate methods. Don’t worry; that’s our next step.

If you’re struggling with the delegate concept, here’s a quick example. Imagine you ask your friend Joe how much he likes using Sinch. Obviously he likes it a lot, but he has no way of getting the information to you. In this scenario, a delegate would be used. The delegate would wait for Joe to say how much he enjoyed it and then bring the information back and take any necessary action based on the reply.

Here are all the delegate methods we need to implement with a brief description of each below:

```objectivec
- (void)session:(MCSession *)session peer:(MCPeerID *)peerID didChangeState:(MCSessionState)state{

}
```

Called when the user’s device changes state; either connects/disconnects from a peer or when a peer connects to the user

```objectivec
- (void)session:(MCSession *)session didReceiveData:(NSData *)data fromPeer:    (MCPeerID *)peerID {

}
```

Called when the device receives data from a peer

```objectivec
- (void)session:(MCSession *)session didReceiveStream:(NSInputStream *)stream withName:(NSString *)streamName fromPeer:(MCPeerID *)peerID {

}
```

Called when the device receives a stream from a peer

```objectivec
- (void)session:(MCSession *)session didStartReceivingResourceWithName:(NSString *)resourceName fromPeer:(MCPeerID *)peerID withProgress:(NSProgress *)progress {

}
```

Called when the device receives something from a peer

```objectivec
- (void)session:(MCSession *)session didFinishReceivingResourceWithName:(NSString   *)resourceName fromPeer:(MCPeerID *)peerID atURL:(NSURL *)localURL withError:(NSError   *)error {

}
```

Called when the device has finished receiving a resource

```objectivec
- (void)browserViewControllerDidFinish:(MCBrowserViewController *)browserViewController {
}
```

Called when the user chooses a peer to connect to

```objectivec
- (void)browserViewControllerWasCancelled:(MCBrowserViewController *)browserViewController {

}
```

Called when the user cancels the MCBrowserViewController

While still in newFriends.m, add this method above the delegate methods:

```objectivec
- (void)setUpConnection {
PFUser *user = [PFUser currentUser];
NSString *screenName = [user objectForKey:@"screenName"];
_username = [user objectForKey:@"username"];
NSString *age = [NSString stringWithFormat:@"%@", [user objectForKey:@"age"]];
NSString *displayName = [NSString stringWithFormat:@"%@, %@", screenName, age];
_peerId = [[MCPeerID alloc] initWithDisplayName:displayName];
NSLog(@"PeerId = %@", _peerId);
}
```

Here we get the current PFUser object from Parse, and from that we get the screenName as set by the user. Instead of displaying the device name, we can display the user’s name, which is far more personalized and can be changed as different users log in. We then set the peerId display name equal to our screenName variable.

Now we can go ahead and create a session. Add this code to the bottom of the method we created above.

```objectivec
self.session = [[MCSession alloc] initWithPeer:self.peerId];
       self.session.delegate = self;
```

Here we’re simply using the session property we created in the @interface of the file, allocating and calling initWithPeer and using the peerId we previously created. Then we can go ahead and set the delegate equal to self so that we’re able to get information from the session.

There’s one last step to finish off this method: We need to put everything together and create a browserViewController. Here’s how simple it's:

```objectivec
self.browserViewController = [[MCBrowserViewController alloc]           initWithServiceType:@"sinchMulti" session:self.session];
self.browserViewController.delegate = self;
```

We’ve allocated and called initWithService and we’ve used the name sinchMulti for this project. Then we’ve simply gone ahead and set the session equal to the session we created earlier. Once again, we’ve set the delegate to self so we can be informed of what’s going on.

Although now we can find other users, there’s one thing we’ve forgotten: it'sn’t much fun if people can’t find us, is it? Let’s go ahead and make our device discoverable. For this, we need to use the advertiserAssistant. Once again, we’re going to add it on to the bottom of the setUpConnection method.

```objectivec
self.advertiserAssistant = [[MCAdvertiserAssistant alloc]                       initWithServiceType:@"sinchMulti" discoveryInfo:nil session:self.session];
[self.advertiserAssistant start];
```

This is some really simple code, and we’re allocating and calling initWithService, which we did earlier. We’ve set the discoverInfo to nil and associated our session we already created with the advertiserAssistant. The last line of code is probably the easiest part of this tutorial and is hopefully pretty self-explanatory.

The finished setUpConnection method should look like this:

```objectivec
- (void)setUpConnection {
PFUser *user = [PFUser currentUser];
NSString *screenName = [user objectForKey:@"screenName"];
_peerId = [[MCPeerID alloc] initWithDisplayName:screenName];

self.session = [[MCSession alloc] initWithPeer:self.peerId];
self.session.delegate = self;

self.browserViewController = [[MCBrowserViewController alloc] initWithServiceType:@"sinchMulti" session:self.session];
self.browserViewController.delegate = self;

self.advertiserAssistant = [[MCAdvertiserAssistant alloc]                       initWithServiceType:@"sinchMulti" discoveryInfo:nil     session:self.session];
[self.advertiserAssistant start];
}
```

This code is looking pretty good; there’s only one small problem. Can you see it? If you said this code isn’t being executed because nowhere in the code has it been called, you’re correct\! It’s best to call this method from viewDidLoad, as I mentioned earlier, it’s a given that this method is going to be called.

```objectivec
- (void)viewDidLoad {
        [self setUpConnection];

}
```

As you can probably see, there’s an error relating to the username property not being declared. Go ahead and declare it in the @interface of newFriends.m, and make it of type NSString and weak/nonatomic. This property will be used throughout the software so it’s best to have it globally accessible.

We’ve made some good progress, but currently there’s no way to present the browserViewController. We’ve included a + bar button in the template file and connected an action to it. In the method, simply include this code to present the browserViewController when the button is triggered.

```objectivec
- (IBAction)findFriends:(id)sender {
[self presentViewController:self.browserViewController animated:YES completion:nil];

}
```

## Sending data

Now that we’ve established a connection between the device, we need a way to exchange usernames and then connect the two devices using Sinch. First, we will send the two usernames and have iOS handle the data and create a conversation for us.

With the multi-peer framework, we can send three types of data. Messages, which are short pieces of text; streams, which allow data such as audio or video to be continuously sent real-time; and resources, which are local images, movies, or documents. For the purpose of this tutorial, we will be sending a message that contains each user’s username. Although we could solely use the multi-peer framework to chat, once you were to move out of range from the other device, your connection would be lost and you’d have no way to connect with the other user. That’s why we’re using Sinch.

If you go ahead and hit the + button; you should be presented with the browserViewController. You may also notice that there’s no way to get back to the original view. We can fix this by adding in the dismissViewController method into the two delegate methods of browserViewController in the newFriends.m file. Make sure to add this line of code to both methods:

```objectivec
[self.browserViewController dismissViewControllerAnimated:YES completion:nil];
```

There are two delegate methods here: One that's called when the browserViewController is canceled and one when the user presses the Done button. Initially, the Done button is only enabled when the user connects to another device.

Now we’re going to head over and do some minor editing to the delegate method didChangeState.

```objectivec
- (void)session:(MCSession *)session peer:(MCPeerID *)peerID didChangeState:(MCSessionState)state{
if (state == MCSessionStateConnected) {
    [self sendUsername:peerID];
}
```

> }

Here we are seeing if the change to state is a connection being made. If it's, then we want to call the method sendUsername and pass along the PeerId of that user. Go ahead and declare the sendUsername method, make it return void, and, of course, make it take a single MCPeerID variable.

```objectivec
- (void)sendUsername:(MCPeerID *)peerID {

}
```

Now let’s add some logic to the method. Just to be clear, we want to send our own username from Parse so that the recipient is then able to connect and send us message through Sinch and vice versa. Add this code:

```objectivec
PFUser *user = [PFUser currentUser];
NSString *username = user.username;
NSData *data = [username dataUsingEncoding:NSUTF8StringEncoding];
NSMutableArray *array = [[NSMutableArray alloc] init];
[array addObject:peerID];
NSError *error = nil;
if (![self.session sendData:data toPeers:array withMode:MCSessionSendDataReliable error:&error]) {
    NSLog(@"Error = %@", error);
}
```

First, we create an instance of PFUser (Parse) and get a reference to the current user. From this, we get the username and store it in a local NSString. We then create a NSData object and store the username in it. Next, we create a mutable array, store the peerId of the intended recipient in it, and call the sendData method. Notice we’ve opted for MCSessionSendDataReliable for the mode; this simply means it will take a little longer to transmit the data, but there’s little chance of the data being lost in transit. We’re only transmitting a few bytes of data so there isn’t much to worry about.

Now that we’re transmitting data, we need to make sure that we’re also equipped to receive any data sent our way.

As we’re making this app, we can expect the only data sent our way to be a single userId, but keep in mind some applications could have many different variables being transmitted. There’s a delegate method already in our .m file that we can use to manage received data. Head over to the didReceiveData delegate method and we will work from there.

```objectivec
- (void)session:(MCSession *)session didReceiveData:(NSData *)data                  fromPeer:(MCPeerID *)peerID {

}
```

Now add this logic into the method:

```objectivec
NSData *localData = data;
    NSString *username = [[NSString alloc] initWithData:localData                       encoding:NSUTF8StringEncoding];
[self createFriend:username];
```

As you can see, we’ve added yet another method, createFriend, which is used to fetch extra details from Parse and create a friend using those objects. Here’s the createFriend method, although at this point you may think, what friend object? Ahh, the one we’re about to create\! Create a new class of type NSObject and name it friend. Add these three properties in the .h file:

```objectivec
@property (nonatomic, retain) NSString *name;
@property (nonatomic, retain) NSString *username;
@property (nonatomic) int age;
```

Make sure the two NSString properties are set to “retain,” or else your data will disappear into thin air along with your friends.

Now we’re ready to go back and create the createFriend method, which uses our new class. Remember to \#import the new class or else you might have a bit of trouble.

```objectivec
- (void)createFriend:(NSString *)username {
friend *newFriend = [[friend alloc] init];
newFriend.username = username;
PFQuery *query = [PFQuery queryWithClassName:@"_User"];
[query whereKey:@"username" equalTo:newFriend.username];
PFObject *object = [query getFirstObject];
newFriend.name = object[@"screenName"];
newFriend.age = [object[@"age"] intValue];
[_friends insertObject:newFriend atIndex:0];
[self.tableView performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:NO];
}
```

First, we create an instance of friend, then we set the username property on the friend object. At the current point in time, that’s the only variable we know the value of. We then go on to create a query. Why? Well we’ve got the username, so we’re now able to get the rest of that users information directly from Parse. We do this by specifying that we want the username key to be equal to our friend’s username. We then call getFirstObject and store it in a local PFObject. It’s expected that there’s only going to be one object matching our query parameters, so it makes sense to only get the first.

We then go ahead and assign the rest of the variables for the friend object. At the bottom of our method, you can see a line of code that we'ven’t yet encountered. This code is calling reloadData, which is an inbuilt method for our tableview. If we called \[self.tableView reloadData\], it wouldn’t automatically reload and refresh the data. Because of this, it’s important to perform a selector on the main thread.

This is all very good but there’s one thing missing. Do you know what it's? There should be an error warning you about it, as you can see there’s no friends array to store our friends. Let’s go ahead and make that now or else we won’t be saving those friends anywhere. We can create an array as a property like this at the top of our .m file in the @interface section:

```objectivec
@interface newFriends ()
        ..
```

> @property (nonatomic, retain) NSMutableArray \*friends; @end

Now we must use the viewDidLoad method to allocate the memory and initialize the object so it’s ready for use. If we don’t, then we won’t have many friends sticking around. The best place to do this is in the viewDidLoad method:

```objectivec
- (void)viewDidLoad {

_friends = [[NSMutableArray alloc] init];
}
```

Now for the easy bit. At the end of the createFriend method, add this easy one-liner:

```objectivec
[_friends addObject:newFriend];
```

Now that we’ve got some friends, it’s time to make them visible. As you can already see, we’ve got a table view that has prototype cells that are made to do the job. All we've to do is set delegates and present the data to our table view. In newFriends.h, set the delegates and modify the @interface line to match this:

```objectivec
  @interface newFriends : UITableViewController <UITableViewDataSource,               UITableViewDelegate, MCBrowserViewControllerDelegate, MCSessionDelegate>
```

As you can see, we’ve made two additions. We’ve set this class as the Data source and the delegate for our table view. Now we can move over and start modifying the .m counterpart.

We need to implement two delegate methods to feed data to the view controller. First, we can implement numberOfRowsInSection. For this, we simply need to return the number of rows we will need in the table view, which will be determined by the number of friends we’ve got.

```objectivec
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:              (NSInteger)section
    {
            return [_friends count];
    }
```

That’s the simple part\! Next we’ve got to implement the delegate method cellForRowAtIndexPath. This method is called to set up each individual cell. Implement it like so:

```objectivec
  - (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:          (NSIndexPath *)indexPath
  {
      static NSString *simpleTableIdentifier = @"SimpleTableCell";

      UITableViewCell *cell = [tableView                                      dequeueReusableCellWithIdentifier:simpleTableIdentifier];

  if (cell == nil) {
  cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault               reuseIdentifier:simpleTableIdentifier];
  }
  friend *myFriend = _friends[indexPath.row];
  UILabel *label = (UILabel*)[cell viewWithTag:1001];
  label.text = [NSString stringWithFormat:@"%@, %i", myFriend.name, myFriend.age];
  return cell;
  }
```

Everything that’s being done here is pretty standard Objective-C. Take note that we’re bringing a “friend” object into memory from the friends array. We’re able to access the specific friend object by its index in the friends array and we’re using indexPath.row to access each index.

## Implementing Sinch

By now, we’ve got friends in our friends array. We’re able to display them and thus we need to work on making contact using Sinch. The first thing to do is sign up for Sinch, if you don’t already have an account. Once you’ve got an account, simply access the dashboard and create a new project. Once you’ve created the project, make sure to take note of the specific project keys.

We already added the framework through CocoaPods at the beginning, so there’s no need to add it again. There’s the option to download the Sinch framework from the website and install it manually. Be aware that you will need to modify the “Other Linker flags” in your build settings to ‘-ObjC -Xlinker -lc++’. CocoaPods make it easier to add these frameworks as we don’t have to make the linker flags modification and we’re able to add the frameworks all at once.

Now we’re ready to get to work implementing Sinch into our project. First, we need to establish where the implementation for Sinch should be made. In this project, it makes the most sense to put all of the Sinch methods in the newFriends class and then have it act as a delegate to other classes. The two other classes that are going to delegate back to newFriends are callView and incomingCall. We need to implement all of the delegate methods for Sinch into the newFriends.m file, but once again, before we do, it’s essential to \#import \<Sinch/Sinch.h\>.

Now we need to initiate the Sinch client in viewDidLoad call \[self setupSinch\] and create a method named setupSinch, which returns void. Before we go any further, create an instance variable of type ID as outlined below.

```objectivec
id<SINClient>_client;
```

Now we can finish off the setupSinch method.

```objectivec
- (void)setupSinch {
        _client = [Sinch clientWithApplicationKey:@“application-id"
            applicationSecret:@“application-secret"
                          environmentHost:@"clientapi.sinch.com"
                                   userId:_username];
        _client.callClient.delegate = self;
        [_client setSupportCalling:YES];
        [_client start];
        [_client startListeningOnActiveConnection];
}
```

This is standard client implementation for Sinch. First we set \_client equal to our application and application secret keys, which can be obtained from the Sinch platform. For testing purposes, all apps will be in the environmentHost of clientapi.sinch.com.

We also set the client userId equal to the username property. This property is set when we call setupConnection in viewDidLoad; refer back to that method if you don’t understand. Next, we set the delegate and then set support calling to YES. If we were going to allow instant messaging within our app, we would call \[\_client setSupportMessaging:YES\]. We would then start the client and begin listening for incoming calls.

Now that we’ve moved on to the implementation of Sinch. Let’s figure the easiest way to work through the problems in front of us. Here’s the functionality we need to add:

- Making calls to selected user
- Answering calls from other users
- Declining calls from other users

Let’s focus on making calls. To do this, we’re going to allow users to select a user from the friends table view. From there, a segue will occur and the user will be presented with the callScreen view controller. Then, we will need to set some properties before the view controller is presented and set some delegates so that our users are able to hang up.

To allow users to select a friend from the table view controller, we need to implement the delegate method didSelectRowAtIndexPath. Before we go ahead and implement the delegate method, it’s best to plan out what needs to be done in plain English for a better understanding. When the user selects the table view cell, a method will be called to present the callScreen view controller with the status set as calling. From the newFriends view controller, we will then have to call some Sinch delegate methods. Now we will have to create a callUser method and then check whether the callDidEstablish method is called. If it's, we will want to change the status of the call. Before moving forward, let’s import the callScreen view controller as we’re going to need to access that when performing segues. We also need to create an instance variable for the call.

```objectivec
#import "callScreen.h"
        …
@implementation newFriends {

id<SINClient>_client;
id<SINCall>_call;
}
```

Notice that we just added the \_call variable to our project. This will be our go-to reference when making calls. Now it’s time to implement didSelectRowAtIndex.

```objectivec
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
friend *friendToCall = [_friends objectAtIndex:indexPath.row];

UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
callScreen *newCall = (callScreen *)[storyboard instantiateViewControllerWithIdentifier:@"callScreen"];
[self presentViewController:newCall animated:YES completion:nil];
newCall.statusLabel.text = @"Calling...";
newCall.nameOfFriendLabel.text = friendToCall.name;

[self placeCall:friendToCall.username];
}
```

Most of this should make sense but I’ll briefly summarize it for those who don’t understand. Firstly, we get a friend object from the \_friends array by using the array index, which should align with indexPath.row. We then create a reference to our storyboard, create an instance of our newCall view controller, and instantiate it with the view controller ID from our storyboard. We then present and set up our view controller. You will see a new method at the bottom; that should be throwing an error at the moment, so let’s create that method and clear that error.

```objectivec
- (void)placeCall:(NSString *)username {
        _call = [_client.callClient callUserWithId:username];
        _call.delegate = self;
}
```

This is a simple method, but once we make this call, what happens? How do we know if we’re connected or not? Well, lucky for us, there are three delegate methods we can use to establish what’s happening. These three methods are callDidProgress, callDidEstablish, and callDidEnd. Go ahead and add all of these methods to the newFriends.m file.

```objectivec
- (void)callDidProgress:(id<SINCall>)call {

}
- (void)callDidEnd:(id<SINCall>)call {

}
- (void)callDidEstablish:(id<SINCall>)call {

}
```

CallDidProgress is where you could play a ringtone or update the UI; feel free to do that as we won’t be delving into anything of that sort today.

We will, however, make some modifications to the other two delegate methods. First, we need to work out a way to access the instance of callScreen from anywhere within our code. How do we do this? The best and easiest way would be to make a property for callScreen. Go ahead and make a property in newFriends.m for callScreen. Make it weak.

```objectivec
@property (nonatomic, weak) callScreen *theNewCallScreen;
```

Now we need to go back to didSelectRowAtIndexPath and use the property instead of local variable to declare the callScreen view controller.

```objectivec
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
friend *friendToCall = [_friends objectAtIndex:indexPath.row];

UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
_theNewCallScreen = (callScreen *)[storyboard instantiateViewControllerWithIdentifier:@"callScreen"];
[self presentViewController:_theNewCallScreen animated:YES completion:nil];
_theNewCallScreen.statusLabel.text = @"Calling...";
_theNewCallScreen.nameOfFriendLabel.text = friendToCall.name;

[self placeCall:friendToCall.username];

}
```

Now we’re ready to head back over and start working with callDidEstablish.

```objectivec
- (void)callDidEstablish:(id<SINCall>)call {
_theNewCallScreen.statusLabel.text = @"Connected";
}
```

Here we’re simply changing the status when the call is connected. Easy stuff\!

Now let’s work with callDidEnd. There are two occasions when this method could be called: When the other user ends the call or when this particular user ends the call. Let’s work on the first scenario.

```objectivec
- (void)callDidEnd:(id<SINCall>)call {
if (_theNewCallScreen != nil) {
    [_theNewCallScreen dismissViewControllerAnimated:YES completion:nil];
        }
}
```

Here we’re saying that if the newCall view controller doesn't equal nil, then go ahead and dismiss it. Now we need to figure out what to do if the local users decides to end the call. Go ahead and add an “else” condition that simply calls return. Why? Well, if the newCall screen already equals nil, there isn’t much point trying to dismiss it again.

Let’s figure out what to do if the user decides to hang up in the callScreen view controller. Here it makes the most sense to use a delegate method. Head over to callScreen.m and start modifying the hangUp method, which we’ve already connected to the button in your storyboard.

In the hangUp method, call hangUp on self.delegate like this:

```objectivec
[self.delegate hangUp];
```

Of course, at this point, there will be a number of errors. Not to worry, it’s a work in progress.

Now in the callScreen.h, we need to finish implementing the delegate. Make a property of type ID, weak, and named delegate.

```objectivec
@property (nonatomic, weak)  id<callScreenDelegate>delegate;
```

Once again, an error will appear because we'ven’t yet implemented the callScreenDelegate protocol. Go ahead and declare the protocol below the \#import in callScreen.h with the single hangUp method.

```objectivec
@protocol callScreenDelegate <NSObject>

    - (void)hangUp;

@end
```

Now we need to modify the @interface line in newFriends.h to declare that this class conforms to the callScreenDelegate protocol.

```objectivec
@interface newFriends : UITableViewController <UITableViewDataSource,               UITableViewDelegate, MCBrowserViewControllerDelegate, MCSessionDelegate,                    SINCallClientDelegate, SINCallDelegate, callScreenDelegate>
```

Head over to the .m counterpart and implement the hangUp method. There are two things that this method will need to achieve: One, it will need to call hangUp with Sinch and two, it’ll need to dismiss the callScreen view controller. Here’s what the hangUp method should look like in newFriends.m:

```objectivec
- (void)hangUp {
        [_call hangup];
        [_theNewCallScreen dismissViewControllerAnimated:YES completion:nil];
}
```

Hanging up the call is easy as pie\! From there we simply call dismissViewController on theNewCallScreen so that we’re back to our table view controller.

As amazing as all this is, there’s one thing that we can’t yet do and it severely limits our application: Allow users to answer calls. Add the following method to newFriends.m:

```objectivec
- (void)client:(id<SINCallClient>)client didReceiveIncomingCall:(id<SINCall>)call   {
```

> }

Before we implement the rest of the code, there’s some groundwork to cover. For this, we will need to \#import incomingCall.h. We’ve been nice enough to create the class and connect it to the relevant storyboard for you already.

When there’s an incoming call, we’re going to present the incomingCall view controller. From there, the user will be given the option to either answer or decline the call. The answer and decline function will once again be implemented using delegates. If a user chooses to answer a call, we will go ahead and present the callScreen.

Within didReceiveIncomingCall, let’s handle the essentials. We need to set delegates, so go ahead and set the delegates for \_call.

```objectivec
call.delegate = self;
    _call = call;
```

Although this code performs a function, it doesn’t do what we need it to do. Ideally, we want to present the incoming call screen and display exactly who’s calling us. We could easily present the username of the user calling us by accessing the remoteUserId property on the call object, although it would be far more personalized if we could display the user’s real name. We’re going to do a simple Parse query to find the name that matches our friend’s username. Add this code into the didReceiveIncomingCallMethod:

```objectivec
PFQuery *query = [PFQuery queryWithClassName:@"_User"];
[query whereKey:@"username" equalTo:call.remoteUserId];
[query getFirstObjectInBackgroundWithBlock:^(PFObject *object, NSError *error) {
    if (!error) {
        NSString *usernameOfCaller = object[@"screenName"];
        [self presentIncomingCallScreen:usernameOfCaller];
                }
}];
```

Within this method, we’re querying Parse and searching for a user object that has a matching username to the user that’s calling us. As you can see, we’re sourcing the username from the remoteUserId property on the call object. Then we run a block, and if there isn’t an error, we get the screen name of the user and store it in a NSString object. In the next line, we’re calling a method that we send the name of the caller to. Although you may think this is a strange place to call a method that presents the incomingCall screen, it’s the most logical. We don’t want to present the incomingCall screen unless we know what the user’s name is, so we wait until after we’ve received that from Parse to present the next screen. Although there will be a small lag while the query is taking place, it’s nothing major and adds to the user experience.

Go ahead and declare the presentIncomingCallScreen method below the didReceiveIncomingCall method in the newFriends.m file. Remember it’s going to need to take one variable, a NSString, and it won’t need to return anything, so make it void. The method should look something like this:

```objectivec
- (void)presentIncomingCallScreen:(NSString *)username {
}
```

Now we’re going to add in the logic. The functionality required will be to present the IncomingCall screen, set the view controller’s delegate, present the view controller itself, and then set the nameOfFriendLabel. Go ahead and try this yourself. The storyboard name is Main and the view controller we want to present identifier is incomingCall. If you had some trouble, here’s the code we came up with:

```objectivec
UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
_theIncomingCallScreen = (incomingCall *)[storyboard instantiateViewControllerWithIdentifier:@"incomingCall"];
_theIncomingCallScreen.delegate = self;
[self presentViewController:_theIncomingCallScreen animated:YES completion:nil];

_theIncomingCallScreen.nameLabel.text = username;
```

Now we’ve only got to implement the delegate methods to either accept or decline an incoming call. Head over to incomingCall.m and find the answer and decline methods. In the respective methods, add these two calls to self.delegate.

```objectivec
[self.delegate answerCall];
[self.delegate declineCall];
```

Of course, we'ven’t yet implemented our protocol and delegate, so we need to do that in our incomingCall.h file.

```objectivec
@protocol IncomingCallDelegate <NSObject>
- (void)answer;
- (void)decline;
@end
```

Now, add the delegate property to match the protocol in the @interface section of incomingCall.h

```objectivec
@property (nonatomic, weak) id<IncomingCallDelegate> delegate;
```

Next we need to make newFriends conform to the protocol. Once again, modify the @interface in newFriends.h.

```objectivec
@interface newFriends : UITableViewController <UITableViewDataSource,           UITableViewDelegate, MCBrowserViewControllerDelegate, MCSessionDelegate,            SINCallClientDelegate, SINCallDelegate, callScreenDelegate, IncomingCallDelegate>
```

Now navigate to the .h file and implement both the answer and decline methods.

```objectivec
- (void)answer {;
        [_call answer];
        [_theIncomingCallScreen dismissViewControllerAnimated:YES completion:nil];
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        _theNewCallScreen = (callScreen *)[storyboard           instantiateViewControllerWithIdentifier:@"callScreen"];
        [_theNewCallScreen setDelegate:self];
        [self presentViewController:_theNewCallScreen animated:YES completion:nil];
}
- (void)decline {
        [_call hangup];
        [_theIncomingCallScreen dismissViewControllerAnimated:YES completion:nil];
}
```

We’ve done all this before, so if you have any trouble working out what’s going on, the best idea is to head back and look over past explanations.

That’s all for now folks\!

As a rough guide, here’s some functionality you could add to this app:

> - Add an instant messaging option using Sinch
> - Make modifications to the user interface
> - Add some profile pictures to the user objects on Parse
> - Have messages automatically save themselves to Parse
> - Persist data on the iOS device
> - Add Facebook login using Parse
> - Configure push notifications so calls can be received at any time

There’s an endless list of things that you can add to this project and I encourage you to experiment with the project.

Sinch is an excellent framework and with its wide range of excellent SDKs and APIs, you can do anything. If you have any questions or would like to get in contact, reach out on Twitter to [me](https://www.twitter.com/brownzac1) or [Christian Jensen](https://www.twitter.com/cjsinch), Sinch’s Developer Evangelist. We look forward to hearing from you\!

And as always, if you have any ideas for upcoming tutorials, give us a shout.
