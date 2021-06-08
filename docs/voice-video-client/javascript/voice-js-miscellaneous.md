---
title: Miscellaneous
excerpt: ""
---

## Restrictions on User IDs

User IDs can only contain characters in the _printable ASCII character set_. that's:

```text
!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
```

User IDs **must not** be longer than **40** characters.

## Encryption export regulations

Please check the Summary of U.S. Export Controls Applicable to Commercial Encryption Products and ensure that the application is registered for the Encryption Regulations, if applicable. It can be found under this [link](http://www.sinch.com/).

## Statistics

The Sinch SDK client uploads statistics to the Sinch servers at the end of a call, a call failure, or similar event. The statistics are used for monitoring of network status, call quality, and other aspects regarding the general quality of the service.

Some of the information is not anonymous and may be associated with the User ID call participants.

The statistics upload is done by the client in the background.
