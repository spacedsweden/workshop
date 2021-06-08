# SDK - Getting started

In this tutorial, you'll create and configure your first Conversation API app from the Sinch Conversation SDK.

## Things you'll need

- [Channels](../channel-support.md) that are set up and registered to be included in the Conversation API.
- Service plan ID/Service ID/Sender Identity set up at corresponding channel portals.
- **Access keys** and **Project ID** which can be found in the [Sinch dashboard](https://dashboard.sinch.com/settings/access-keys).
- Setting up the keys as variables like the following:

```properties
sinch.project_id=__project_id__
sinch.key_id=__key_id__
sinch.key_secret=__key_secret__
```

- Getting the following dependencies on the the project.

```xml Maven
    <dependency>
        <groupId>com.sinch.sdk</groupId>
        <artifactId>java-sdk</artifactId>
        <version>${sdk.version}</version>
    </dependency>
```

```groovy Gradle
    implementation "com.sinch.sdk:java-sdk:${sdkVersion}"
```

## Apps

For every operation you'll need the App object:

```java
private static com.sinch.sdk.api.conversationapi.service.Apps apps;
apps = Sinch.conversationApi(Region.EU).apps();
```

### Step One: Creating a new App

To create an App you'll need the following snippet:
(This guide is gonna use the Messenger channel and RCS)

At this point you'll need your messenger token:

```java
new StaticTokenCredential().token("__messenger_token__");
```

After that you create a channel credential with the token:

```java
new ConversationChannelCredential().channel(
    ConversationChannel.MESSENGER)
    .staticToken(new StaticTokenCredential().token("__messenger_token__"));
```

Aditionally you'll need your bearer credentials for the RCS channel:

```java
new ConversationChannelCredential().channel(
    ConversationChannel.RCS)
    .staticBearer(new StaticBearerCredential()
    .claimedIdentity("_rcs_auth_id___").token("__rcs_token__"));
```

With that already on hand, you can create the actual app with a provided name:

```java
apps.create(
    new App()
        .displayName("SDK application name")
        .addChannelCredentialsItem(
            new ConversationChannelCredential()
                .channel(ConversationChannel.MESSENGER)
                .staticToken(new StaticTokenCredential()
                .token("__messenger_token__")))
        .addChannelCredentialsItem(
            new ConversationChannelCredential()
                .channel(ConversationChannel.RCS)
                .staticBearer(
                    new StaticBearerCredential()
                        .claimedIdentity("_rcs_auth_id___")
                        .token("__rcs_token__"))));
```

And with that you have created you own app directly from the Conversation SDK.

### Step Two: Listing your Apps

If you're in need to list all your available apps you'll just need to execute the following call:

```java
apps.list();
```

Preferrible stored in a `List<App>` object.

Likewise if you need a specific App to display information off it you'll use the next function:

```java
apps.get(APP_ID)
```

### Step Three: Updating or Deleting an App

If you've put the worng name for the App you don't have to create a new one with the correct one, instead you can update the name directly from the SDK (like from the Dashboard).

First you'll need the App ID (you can get it at step two) once you have it, you'll just have to call the function:

```java
apps.update(APP_ID, new App().displayName("Updated SDK application name"));
```

And if you would just like to delete the App for other reasons you'll also need the App ID and call the correct function:

```java
apps.delete(APP_ID);
```

## Messages

For every operation you'll need the Messages object:

```java
private com.sinch.sdk.api.conversationapi.service.Messages messages,
messages = Sinch.conversationApi(Region.EU).messages(AppsExamples.APP_ID);
```

### Step One: Send Message

In this example we'll send a message with options called a Carousel Message

First we'll start by creating our main message:

```java
new MediaMessage().url("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png");
```

In this example we are using an image as the message.

Then create the desired choices:

```java
new Choice().textMessage(new TextMessage().text("Suggested Reply 1 Text")));
```

In here you can set your options (for simplicity we'll user numbered placeholders).

After you have your choices created we create the CardMessage object with options:

```java
Choice c1 = new Choice()
    .textMessage(new TextMessage().text("Suggested Reply 1 Text"));

Choice c2 = new Choice()
    .textMessage(new TextMessage().text("Suggested Reply 2 Text"));

Choice c3 = new Choice()
    .textMessage(new TextMessage().text("Suggested Reply 3 Text"));

MediaMessage mm = new MediaMessage()
    .url("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/" +
        "uploads/2019/05/Sinch-logo-Events.png");

new CardMessage()
    .title("This is the card 1 title")
    .description("This is the card 1 description")
    .mediaMessage(mm)
    .addChoicesItem(c1)
    .addChoicesItem(c2)
    .addChoicesItem(c3);
```

Now this will be the whole snippet for sending the message with the Messages object:

```java
CardMessage cm1 = new CardMessage()
    .title("This is the card 1 title")
    .description("This is the card 1 description")
    .mediaMessage(new MediaMessage()
        .url("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(new Choice().urlMessage(
        new UrlMessage().title("URL Choice Message:")
            .url("https://www.sinch.com")));

CardMessage cm2 = new CardMessage()
    .title("This is the card 2 title")
    .description("This is the card 2 description")
    .mediaMessage(new MediaMessage()
        .url("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(new Choice().callMessage(
        new CallMessage().title("Call Choice Message:").phoneNumber("46732000000")));

CardMessage cm3 = new CardMessage()
    .title("This is the card 3 title")
    .description("This is the card 3 description")
    .mediaMessage(new MediaMessage()
        .url("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(new Choice().locationMessage(
        new LocationMessage()
            .title("Location Choice Message")
            .label("Enriching Engagement")
            .coordinates(
                new Coordinates().latitude(55.610479f).longitude(13.002873f))));

messages.send(new SendMessageRequest()
    .message(new AppMessage().carouselMessage(
        new CarouselMessage().addCardsItem(cm1).addCardsItem(cm2).addCardsItem(cm3)))
    .recipient(RecipientFactory.fromContactId(ContactsExamples.CONTACT_ID))
    .addChannelPriorityOrderItem(ConversationChannel.SMS));
```

And you can also add several different options (not neccessarily all of them in a given message).

An example of a single message would be like this:

```java
CardMessageRequest cmr = new CardMessageRequest("This is the card 1 title")
    .description("This is the card 1 description")
    .media("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
        "wp-content/uploads/2019/05/Sinch-logo-Events.png")
    .addTextChoice("Suggested Reply 1 Text")
    .addTextChoice("Suggested Reply 2 Text")
    .addTextChoice("Suggested Reply 3 Text")
    .getMessage();

CardMessage cm1 = cardMessage("This is the card 2 title")
    .description("This is the card 2 description")
    .mediaMessage(
        mediaMessage(
            "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(
        choice(urlMessage("URL Choice Message:", "https://www.sinch.com")));

CardMessage cm2 = cardMessage("This is the card 3 title")
    .description("This is the card 3 description")
    .mediaMessage(
        mediaMessage(
            "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(choice(callMessage("Call Choice Message:", "46732000000")))

CardMessage cm3 = cardMessage("This is the card 4 title")
    .description("This is the card 4 description")
    .mediaMessage(
        mediaMessage(
            "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/" +
            "wp-content/uploads/2019/05/Sinch-logo-Events.png"))
    .addChoicesItem(
        choice(
            locationMessage("Location Choice Message", 13.002873f, 55.610479f)
                .label("Enriching Engagement")))

messages.send(
    new CarouselMessageRequest()
        .addCard(cmr)
        .addCard(cm1)
        .addCard(cm2)
        .addCard(cm3)
        .contactRecipient(ContactsExamples.CONTACT_ID));
```

In this example we use a Carousel style for the message.

### Step Two: List Messages

For listing messages you'll need the ContactID to filter:

```java
final ListMessagesResponse response = messages.list(
    new ListMessagesParams().contactId(ContactsExamples.CONTACT_ID));
```

To get a single message you'll need the MessageID and call the function:

```java
messages.get(MESSAGE_ID);
```

You can also delete the message as follows:

```java
messages.delete(MESSAGE_ID);
```

## Webhooks

For every operation you'll need the Webhooks object.

```java
private com.sinch.sdk.api.conversationapi.service.Webhooks webhooks;
webhooks = Sinch.conversationApi(Region.EU).webhooks();
```

### Step One: Creating Webhooks

For simplicity this is the basic example with the most used Triggers:

```java
webhooks.create(
    new Webhook()
        .appId(AppsExamples.APP_ID)
        .target("https://webhook.site/d9cb2b5f-5ecd-4c19-ac34-b059b6e5eae1")
        .addTriggersItem(WebhookTrigger.MESSAGE_DELIVERY)
        .addTriggersItem(WebhookTrigger.EVENT_DELIVERY)
        .addTriggersItem(WebhookTrigger.MESSAGE_INBOUND)
        .addTriggersItem(WebhookTrigger.EVENT_INBOUND)
        .addTriggersItem(WebhookTrigger.CONVERSATION_START)
        .addTriggersItem(WebhookTrigger.CONVERSATION_STOP)
        .addTriggersItem(WebhookTrigger.UNSUPPORTED)
        .targetType(WebhookTargetType.HTTP));
```

In here you can see that we require the AppID (you can see how to create Apps or list existing Apps on the App guide).

### Step Two: Listing Webhooks

You can list webhooks that are part of an specific App:

```java
webhooks.list(AppsExamples.APP_ID);
```

Preferible stored on a `List<Webhook>` object.

Aside if you only need to get a single Webhook you can get it by using the Webhook ID:

```java
webhooks.get(WEBHOOK_ID);
```

### Step Three: Updating and Removing Weebhooks

If it's needed you can update with the following function:

```java
webhooks.update(WEBHOOK_ID, new Webhook().targetType(WebhookTargetType.GRPC));
```

In this example we change the target type for the webhook.

If you need to remove the webhook as a whole use this (note that you'll need the Webhook ID):

```java
webhooks.delete(WEBHOOK_ID);
```

## More Examples

If you need more examples you can follow this link to the [GitHub Repo](https://github.com/sinch/sinch-java/tree/master/src/test/java/example/conversationapi).
