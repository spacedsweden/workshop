---
title: Receive SMS
description: >-
  Learn how to quickly receive SMS messages in Java applications with
  the Sinch API
redirectFrom:
  - /docs/sms-java
---

# Receiving SMS Messages

Learn how to quickly set up a Java server to receive SMS messages with the Sinch API.

## Things you'll need

Before you can get started, you need the following already set up:

* [JDK 11](https://www.oracle.com/java/technologies/javase-downloads.html) or later.
* [Gradle](https://gradle.org/install/).
* You are familiar with [Spring Boot](https://spring.io/projects/spring-boot).
* A free Sinch account with a test phone number. If you don't have one, click [here](./../sinchaccount.md) to find out how to sign up and get your free test number.
* [ngrok](https://ngrok.com/). You'll use ngrok to open a tunnel to your local server.

## Set it up

1. Clone the Git repo on GitHub at <https://github.com/sinch/sms-java-sample>.

2. Assign the following parameters in `SmsJavaSampleApplication.java` with your values:

   |Parameter |Your value
   --- | ---
   |`SERVICE_PLAN_ID` |The service plan ID found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest).|
   |`TOKEN` |The API token found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest). Click **Show** to reveal your API token.|
   |`SENDER` |Any number you've assigned to your Sinch account. Find the number on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest) by clicking the service plan ID link and scrolling to the bottom of the page.|

3. When a customer sends an SMS to your number, you can configure your application to receive a post to a webhook. The code that handles incoming SMS is located in SmsJavaSampleApplication.java:

   ```java
   @RestController
   public class InboundController {
       @PostMapping("/sms/incoming")
       public ResponseEntity<Object> receiveInbound(@RequestBody Object body) {
          System.out.println(incoming);
       //send an autoreply back
       String[] to = {  incoming.sender};
       MtBatchTextSmsCreate message = SinchSMSApi.batchTextSms().sender(SENDER).addRecipient(to)
         .body("Automated reply").build();
       try {
       MtBatchTextSmsResult batch = conn.createBatch(message);
       System.out.println(batch);

       } catch (Exception e) {
       System.out.println(e.getMessage());
       }
       return new ResponseEntity<>("Accepted", HttpStatus.OK);
       }
   }
   ```

4. Before you can handle incoming traffic to your local server, you need to open up a tunnel to your local server. For that, you can use an [ngrok](https://ngrok.com/) tunnel. If you haven't already, install ngrok, and then open a terminal/command prompt and type: `ngrok http 3000`. Take note of the URL that ends in **.ngrok.io**.

5. Next, you need to configure your SMS service to handle callbacks. Login to your [Dashboard](https://dashboard.sinch.com/sms/api/rest), and click your service ID plan.

6. Under **Callback URL**, click **Edit** and paste the ngrok URL into the field. It can take a minute before the change is propagated to all servers.

7. In the terminal windows, start running the SpringBoot Application with `./gradlew bootRun`.

8. Send an SMS to your Sinch number and you should get a automatic reply.
