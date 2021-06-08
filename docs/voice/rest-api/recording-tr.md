---
title: Recording calls
description: >-
  Control recording of calls with the Sinch platform, with callbacks or the
  Manage Call API.
redirectFrom:
  - /docs/voice-rest-api-recording-tr
---

# Recording calls

Control recording of calls with the Sinch platform, with callbacks or the Manage Call API.

## Overview

With the Sinch platform, you’re able to control the recording of the calls using either the callbacks or the Manage Call API.

## Call recording

There are multiple ways to start call recording:

- Using the Manage Call API
- Sending the StartRecording instruction as part of a callback response
- Setting the recording flag to true in the Action of the SVAML, during a callback response

In every case, the Recording Options are required to specify the details about the recording.

## Conference recording

Conference recording can be enabled by either setting the recording flag in the ConnectConf action to true in the callback response (ICE/ACE) or by using the Conference API.

Note that there is a difference between conference and call recording. Every participant in a conference has an associated callId which can be used to start recording for that specific call. The recording file will contain the mix from the conference that was sent to that channel. However, once that participant leaves the conference, the recording is finished. Conference recording on the other hand, ends when all the participants leave the room, or when the platform receives a command to stop recording.

Also note that using the StartRecording instruction will start a call recording, even when used with the ConnectConf action. Recording instructions are only used for call recording.

## Recording instructions

- StartRecording
- StopRecording

Format:

    {
        "name": "StartRecording",
        "options": [RecordingOptions]
    }

    {
        "name": "StopRecording"
    }

Using instructions brings more flexibility in what parts of the call should be recorded. For example, you might want to skip the first part of a Text-To-Speech instruction that was played, but want to include the next. Let’s say we've this SVAML response to an ICE callback:

    {
        "instructions": [{
            "name": "Say",
            "text": "Hello world, I don't want you to record this part",
            "locale": "en-US"
        }, {
            "name": "StartRecording",
            "options": [...]
        }, {
            "name": "Say",
            "text": "Hello world, this part will be recorded",
            "locale": "en-US"
        }],
        "action": {
            ...
        }
    }

In this example, the recording starts after the first Say instruction is finished executing, so the second part will be included in the recording file.

## Recording options

The recording options are sent as part of the callback response when you want to enable recording of a call or a conference.

    [RecordingOptions]
    string - destinationUrl
    string - credentials
    string - format
    bool   - notificationEvents
    object - [transcriptionOptions]: {
                bool    - enabled,
                string  - locale
                }

_example ACE response_

    {
        "action": {
            "name": "Continue",
            "record": true,
            "recordingOptions": {
                "destinationUrl": "s3://my-s3-bucket",
                "credentials": "xyz\_access\_key:wrt\_secret\_key:eu-central-1",
                "format": "mp3",
                "notificationEvents": true,
                "transcriptionOptions": {
                    "enabled": true,
                    "locale": "en-US"
                }
            }
        }
    }

**destinationUrl** is where the recording file should be stored. Sinch supports the following destinations:

**credentials** specify the information required for the Sinch platform to authenticate and/or authorize in the destination service in order to be able to store the file.

**format** (optional) specifies the format of the recording file. Default value is “mp3”

**notificationEvents** (optional) specifies if Sinch should send your backend events when the call recording is finished and when the file is available in the destination URL specified. Default value is “true”

## DestinationURL

This property is a URI and specifies where the recording file should be stored. Sinch supports multiple platforms for storage and will continue to enable new in the future:

- Amazon S3
- Sinch Drive (Coming Soon)

**Note** use can, but you don’t have to specify the filename in the destination. If there is no filename specified in the URI, Sinch will generate a unique name with the following format: (UTCDate_yyyyMMddHHmmss)\_(applicationKey)\_(callId).(format)

**Note** Sinch doesn't check if a filename exists in the specified path and will overwrite any existing file with the same filename.

## DestinationURL: Amazon S3

Using the “recordingOptions” property, you can direct the Sinch platform to store the recording file to an Amazon S3 bucket. The “destinationUrl” property should be specified with a “s3” schema, followed by the bucket name and optionally destination folder and file:

s3://bucket_name/\[\[folder]/\[file]]

Using the Amazon S3 as a destination requires that the credentials be specified. The format of the credentials is defined with:

(AwsAccessKey):(AwsSecretKey):(AwsRegion)

_Example_

    {
        "recordingOptions": {
            "destinationUrl": "s3://sinch-storage/voice-recordings/my-recording.mp3",
            "credentials": "AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY:eu-central-1",
            "notificationEvents": true
        }
    }

**Note** it's recommended that the credentials you specify authorize the Sinch platform to only write to the destination bucket. Sinch will never request read permissions.

## DestinationURL: Sinch Drive - Coming soon

You can store the recording files to our storage - Sinch Drive, by using the “sdrive” schema identifier. Check the Sinch Drive API documentation for managing the stored files.

Specifying folders in the destination is not supported by this type of storage, so if specified, the folder part will be ignored:

sdrive://\[file]

_Example_

    {
        "recordingOptions": {
            "destinationUrl": "sdrive://my-recording.mp3",
            "notificationEvents": true
        }
    }

## TranscriptionOptions

When active this option will trigger a transcription process using the audio call recording as input and generating as output a JSON file with the Speech to Text representation of the recorded call.

The generated file will be saved on the same location as defined on the call recording destinationURL parameter.

_Example_

    {
        "recordingOptions": {
            "destinationUrl": "sdrive://my-recording.mp3",
            "notificationEvents": true
            ...
            "transcriptionOptions": {
                    "enabled": true,
                    "locale": "en-US",
              },
        }
    }

_Transcribed output file example_

    {
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "lines": [
        {
            "timestamp": 4.97,
            "speakerLabel": "Speaker 1",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            "timestamp": 5.6,
            "speakerLabel": "Speaker 2",
            "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]
    }

## Notification events

Two notification events are sent to the partner’s backend if **notificationEvents** are enabled:

- recording_finished - indicating that the recording for the specified call has been stopped either by a Manage Call request or because the call has ended

- recording_available - indicating that the recording file is available in the specified **destinationUrl** and can be picked up

- transcription_available - indicating that the transcription file is available in the specified **destinationUrl** and can be picked up

:::info

:::

_Example_

    {
        "event": "notify",
        "callid": "01234567-89ab-cdef-fedc-ba9876543210",
        "version": 1,
        "type": "recording_finished"
    }

    {
        "event": "notify",
        "callid": "01234567-89ab-cdef-fedc-ba9876543210",
        "version": 1,
        "type": "recording_available",
        "destination":"https://www.sinch.com/calling/v1/recording/201801010000_01234567-89ab-cdef-fedc-ba9876543210_01234567-89ab-cdef-fedc-ba9876543210.mp3"
    }

    {
        "event": "notify",
        "callid": "01234567-89ab-cdef-fedc-ba9876543210",
        "version": 1,
        "type": "transcription_available",
        "destination":"https://www.sinch.com/calling/v1/recording/201801010000_01234567-89ab-cdef-fedc-ba9876543210_01234567-89ab-cdef-fedc-ba9876543210-transcript.json"
    }
