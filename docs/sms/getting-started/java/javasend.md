---
title: Send SMS
description: >-
  Learn how to quickly send SMS messages in Java applications with
  the Sinch API
redirectFrom:
  - /docs/sms-java
---

# Sending SMS Messages

Learn how to quickly send SMS messages in a Java application with the Sinch API.

## Things you'll need

Before you can get started, you need the following already set up:

* [JDK 11](https://www.oracle.com/java/technologies/javase-downloads.html) or later.
* [Gradle](https://gradle.org/install/).
* You are familiar with [Spring Boot](https://spring.io/projects/spring-boot).
* A free Sinch account with a test phone number. If you don't have one, click [here](./../sinchaccount.md) to find out how to sign up and get your free test number.

## Set it up

1. Clone the Git repo on GitHub at <https://github.com/sinch/sms-java-sample>.

2. Assign the following parameters in `SmsJavaSampleApplication.java` with your values:

   |Parameter |Your value
   --- | ---
   |`SERVICE_PLAN_ID` |The service plan ID found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest).|
   |`TOKEN` |The API token found on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest). Click **Show** to reveal your API token.|
   |`SENDER` |Any number you've assigned to your Sinch account. Find the number on your Sinch [dashboard](https://dashboard.sinch.com/sms/api/rest) by clicking the service plan ID link and scrolling to the bottom of the page.|

3. The code that sends SMS messages is in the method `sendSMS` in the file **src/main/main/java/com/sinchdemos/smsjavasample/SmsJavaSampleApplication.java**:

   ```java SmsJavaSampleApplication.java
   @PostMapping("/sms/send")
     public MtBatchTextSmsResult sendSMS(@RequestBody SMSModel sms) {
       //Get the number you want to send to from the request
       String[] to = { sms.ToPhonenumber };
       //create a messageBatch 
       //a batch is a collection of message to one or more recipients
       MtBatchTextSmsCreate message = SinchSMSApi
         .batchTextSms()
         .sender(SENDER)
         .addRecipient(to).body(sms.Body)
         .build();
   
       try {
         //if there is something wrong with the batch 
         //it will be exposed in APIError
         MtBatchTextSmsResult batch = conn.createBatch(message);
         return batch;
       } catch (Exception e) {
         System.out.println(e.getMessage());
       }
       return null;
    }
       }
   ```

4. Since this is a Spring Boot application with rest controllers you need to start your local webserver to test it. To start the server, execute the following command:

   ```shell Curl
   .\gradlew bootRun
   ```

   ```powershell PowerShell
   .\gradlew bootRun
   ```

5. To send an SMS message, make a POST request with your favorite tool and don't forget to change _ToPhonenumber_ to your own number (including + and country code, i.e. +11234567890).

   ```shell Curl
   curl --location --request POST 'https://localhost:8080/sms/send' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "ToPhonenumber": "+_ToPhonenumber_",
       "Body": "Hello"
   }'
   ```

   ```powershell PowerShell
   $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
   $headers.Add("Content-Type", "application/json")
   $body = "{
   `n    `"ToPhonenumber`": `"_ToPhonenumber_`",
   `n    `"Body`": `"Hello`"
   `n}"
   $response = Invoke-RestMethod 'http://localhost:8080/sms/send' -Method 'POST' -Headers $headers -Body $body
   $response | ConvertTo-Json
   ```

The code you used sends a POST request to the Sinch API **/batches** endpoint to send the SMS message. Click [here](../../../../../openapi/sms/tag/Batches) to read more about the batches endpoint.
