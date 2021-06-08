---
title: Save MMS notification
description: ""
redirectFrom:
  - /docs/postback-notifications
---

# Postback Notifications

## Postback Notifications

When an MMS is saved, the system will generate a Postback notification and unlock MMS for further use. If an MMS contains audio/video, Postback will be sent when the encoding of the MMS audio/video is finished, otherwise Postback notification will be sent instantly. Below is an example of Postback notification when an MMS is saved successfully:

**saveMMS Postback notification**

```xml
<POSTBACK>
    <ORIGIN>MMS_MT</ORIGIN>
    <CODE>N003</CODE>
    <MMSID>35674</MMSID>
</POSTBACK>
```

If there was an error encoding the MMS audio/video, the system will generate a notification:

**saveMMS error Postback Notification**

```xml
<POSTBACK>
    <ORIGIN>MMS_MT</ORIGIN>
    <CODE>E002</CODE>
    <MMSID>35674</MMSID>
    <AUDIONAME>http://www.yoursite.com/audio/1.mp3</AUDIONAME>
</POSTBACK>
```

## Special Considerations for saveMMS

- The API SHALL reformat the content when necessary so that it can be delivered to the end users handset in the best possible way.
- Delivery success takes precedence over audio and video content quality and occasionally the picture quality will be reduced to fit handset message size requirements.
- Video SHALL be reduced in quality to fit delivery limitations and if it still doesn't fit it will be delivered as XHTML/SMS.
- Each request MUST contain at least one slide which MAY contain text and/or image and/or video and/or audio and/or objects (vcard/ical/pdf/passbook).
- The API SHALL support up to 80 characters in the MMS subject.
- The API SHALL support up to 8 slides for each MMS submission.
- The API SHALL NOT support multiple files of the same MIME type on the same slide.
- Slides with image SHALL NOT support video but SHALL support audio.
- Slides with audio SHALL NOT support video. Slides with video SHALL only support text.
- Slides with text SHALL support up to 5000 characters in any slide.
- Slide with vcard/ical/pdf/passbook object SHALL NOT support media type audio/video/image and vice-versa.
- All slides MAY contain a duration for playback.
- Default slide duration is 10 seconds.
- Slide duration will be overwritten with the audio/video file duration after encoding is completed.
- URLs provided MUST contain the full path to the mime files.
- Slide Duration SHOULD NOT exceed 30 seconds.
- MMS subject is required.
- MMS containing audio/video can be used only when audio/video encoding is completed.
- After submission you won't be given a successful acknowledgement of audio/video encoding when a message is submitted
- The HTTP status of audio/video encoding after it has been completed will be sent to your Postback URL.
- Supported Media: TEXT/PLAIN, GIF/JPG/PNG, MP3/WAV, 3GP, MP4, MPEG, MPG, AVI, WMV.
- There is a maximum source file size for each supported source file submitted.
- You can find out what the current maximum is by visiting your API settings.
- MMS messages are delivered in B64 encoding To estimate the final size of Base64-encoded binary data multiply the filesize by 1.37 times the original data size + 814 bytes (for headers).
