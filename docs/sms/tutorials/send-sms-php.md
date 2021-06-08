---
title: Send SMS in PHP
description: >-
  Sending SMS from applications is more popular than ever, and this small script
  will enable you to send SMS in PHP. Find out more and sign up with Sinch
  today.
redirectFrom:
  - /docs/send-sms-php
---

# Send SMS in PHP

Sending SMS from applications is more popular than ever, and this small script will enable you to send SMS in PHP. Find out more and sign up with Sinch today.

## Prerequisites

1. You have created your Sinch account. If you don't have one, create one [here](https://www.sinch.com/sign-up/) and get some free credits to try the API with.
2. You have PHP installed. If you don't, you can read about how to install it on your system [here](https://www.php.net/manual/en/install.php).

### Credentials

If you don't already have an API configured, go to your API Overview and click on the _Add new REST API_ button. Your credentials will be generated and shown within seconds!

1. [Login](https://dashboard.sinch.com/login) to the dashboard.
2. Go to your [API Overview](https://dashboard.sinch.com/sms/api/rest) and find your _Service Plan ID_ and _API Token_. We'll need these in our script below.

## Enter your credentials

First, we need to create a file (`send_sms.php`) to save our code in. You can find the finished code [here](#code).

Let's start with plugging in our credentials found in the [API Overview](https://dashboard.sinch.com/sms/api/rest).

```php
$service_plan_id = "your_service_plan_id";
$bearer_token = "your_api_token";
```

## Enter your phone numbers

You need numbers to send messages to and from! Let's setup the content for our JSON's `to` and `from` fields.

Set the value of the `recipient_phone_numbers` token to any number (or numbers) you want to receive the message. Set the value of the `send_from` token to a phone number assigned to your API in your Sinch dashboard.

```php
//May be several, separate with a comma `,`.
$recipient_phone_numbers = "recipient_phone_numbers"; 
//Any phone number assigned to your API
$send_from = "your_assigned_number";
```

Write a message that you want to send!

```php
$message = "Test message to {$recipient_phone_numbers} from {$send_from}";
```

That's it! Just copy the rest of the script and you'll be sending messages in no time.

## Code

```php
<?php
$service_plan_id = "your_service_plan_id";
$bearer_token = "your_api_token";

//Any phone number assigned to your API
$send_from = "your_assigned_number";
//May be several, separate with a comma `,`.
$recipient_phone_numbers = "recipient_phone_numbers"; 
$message = "Test message to {$recipient_phone_numbers} from {$send_from}";

// Check recipient_phone_numbers for multiple numbers and make it an array.
if(stristr($recipient_phone_numbers, ',')){
  $recipient_phone_numbers = explode(',', $recipient_phone_numbers);
}else{
  $recipient_phone_numbers = [$recipient_phone_numbers];
}

// Set necessary fields to be JSON encoded
$content = [
  'to' => array_values($recipient_phone_numbers),
  'from' => $send_from,
  'body' => $message
];

$data = json_encode($content);

$ch = curl_init("https://us.sms.api.sinch.com/xms/v1/{$service_plan_id}/batches");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BEARER);
curl_setopt($ch, CURLOPT_XOAUTH2_BEARER, $bearer_token);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);

if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    echo $result;
}
curl_close($ch);
?>
```

### Run the code

```bash
php send_sms.php
```
