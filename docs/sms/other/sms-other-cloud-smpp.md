---
title: Cloud SMPP
excerpt: >-
  Our Cloud SMPP service is available to you immediately after creating an
  account on our [site](https://dashboard.sinch.com/#/signup). It uses the
  same core platform and backend connections as our Enterprise SMPP service.
---

## Connection Configuration

|                                            |                                         |
| ------------------------------------------ | --------------------------------------- |
| SMPP Version                               | 3.3 or 3.4                              |
| Bind Type                                  | Transmitter, Receiver or Transceiver    |
| Service Type, auth TON and auth NPI        | All values are ignored and can be blank |
| Asynchronous outstanding operations window | 10                                      |
| Maximum allowed sessions                   | 3                                       |

## Hosts

You can connect to any of the following hosts with your given username and password.

| Host                              | Location           |
| --------------------------------- | ------------------ |
| sms-cloud-1.clxcommunications.com | London, UK         |
| sms-cloud-2.clxcommunications.com | Virginia, US       |
| sms-cloud-3.clxcommunications.com | Dallas, US         |
| sms-cloud-5.clxcommunications.com | Frankfurt, Germany |

## Ports

Please ensure that you choose the correct port for the message encoding you are submitting.

| Encoding              | Port |
| --------------------- | ---- |
| GSM, Unicode & Binary | 8000 |
| Latin 1 (ISO-8859-1)  | 9000 |

Optionally, we support the SSL/TLS connection.

| Encoding              | Port |
| --------------------- | ---- |
| GSM, Unicode & Binary | 8443 |
| Latin 1 (ISO-8859-1)  | 9443 |

## Bind Operations

There are three ways to open a connection using SMPP. You can connect as:

- **Transmitter** - send short messages to SMSC and receive responses from SMSC.
- **Receiver** - receive delivery receipts from the SMSC and return the corresponding responses.
- **Transceiver** - send and receive messages to and from the SMSC over a single SMPP session.

## Session States

Your connection to our server across an SMPP link can be in one of five states:

- **OPEN** - connected and bind pending
- **BOUND_TX** - onnected and requested to bind as a Transmitter
- **BOUND_RX** - connected and requested to bind as a Receiver
- **BOUND_TRX** - connected and requested to bind as a Transceiver
- **CLOSED** - unbound and disconnected

## Bind Parameters

The syntax for initiating a `bind_transmitter`, `bind_receiver` or `bind_transceiver` instance uses the following parameters:

- **system_id** - identifies the user requesting to bind (username)
- **password** - password to allow access
- **system_type** - identifies the system type (ignored, set to blank)
- **interface_version** - indicates SMPP version supported by user
- **addr_ton** - identifies user type of number (ignored, set to blank)
- **addr_npi** - numbering plan indicator for user (ignored, set to blank)
- **address_range** - The user address

## Submit_sm Parameters

The parameters required for the SUBMIT_SM request (used to send an SMS) are:

- **service_type** - indicates SMS application service
- **source_addr_ton** - type of number for source address
- **source_addr_npi** - numbering plan indicator for source address
- **source_addr** - source address
- **dest_addr_ton** - type of number for destination
- **dest_addr_npi** - numbering plan indicator for destination
- **destination_addr** - destination address of the short message
- **esm_class** - message mode and type
- **protocol_id** - protocol identifier (network specific)
- **priority_flag** - sets the priority of the message (this is ignored)
- **schedule_delivery_time** - set to NULL for immediate delivery (this is ignored)
- **validity_period** - validity period of message
- **registered_delivery** - indicator to signify if an SMSC delivery receipt or acknowledgment is required
- **replace_if_present_flag** - flag indicating if submitted message should replace an existing message (this is ignored)
- **data_coding** - defines the encoding scheme of the SMS message
- **sm_default_msg_id** - indicates short message to send from a predefined list of messages stored on SMSC (this is ignored)
- **sm_length** - length in octets of the short_message user data
- **short_message** - up to 254 octets of short message user data.
- **user_message_reference** - user assigned reference number

## Deliver_sm Parameters

deliver_sm has the same parameter list as the submit_sm request:

- **service_type** - indicates SMS application service
- **source_addr_ton** - type of number for source address
- **source_addr_npi** - numbering plan indicator for source address
- **source_addr** - source address
- **dest_addr_ton** - type of number for destination
- **dest_addr_npi** - numbering plan indicator for destination
- **destination_addr** - destination address of the short message
- **esm_class** - message mode and type
- **protocol_id** - protocol identifier (network specific)
- **priority_flag** - sets the priority of the message (this is ignored)
- **schedule_delivery_time** - set to NULL for immediate delivery (this is ignored)
- **validity_period** - validity period of message
- **registered_delivery** - indicator to signify if an SMSC delivery receipt or acknowledgment is required
- **replace_if_present_flag** - flag indicating if submitted message should replace an existing message (this is ignored)
- **data_coding** - defines the encoding scheme of the SMS message
- **sm_default_msg_id** - indicates short message to send from a predefined list of messages stored on SMSC (this is ignored)
- **sm_length** - length in octets of the short_message user data
- **short_message** - up to 254 octets of short message user data.
- **user_message_reference** - user assigned reference number

The SMSC delivery receipt is carried as the user data payload in the SMPP *deliver_sm* operation.

_deliver_sm_resp_ requests require only a *message_id* parameter. Delivery receipts are addressed to the originator of the message.

## Transactional Error Codes

To help you identify what might be causing a problem with your SMPP transaction, here is a list of error codes with a small description:

| Code | Description                           |
| ---- | ------------------------------------- |
| 0    | No error                              |
| 3    | Invalid command ID                    |
| 4    | Invalid bind status for given command |
| 5    | ESME already in bound state           |
| 10   | Invalid source address                |
| 12   | Message ID is invalid                 |
| 13   | Bind failed                           |
| 14   | Invalid password                      |
| 15   | Invalid system ID                     |
| 20   | Message queue full                    |
| 21   | Invalid system type                   |
| 97   | Invalid scheduled delivery time       |
| 98   | Invalid message delivery period       |

## SMPP Commands

The SMS Gateway supports the following SMPP commands:

| Command               | Description                        | HEX Code   |
| --------------------- | ---------------------------------- | ---------- |
| generic_nack          | Generic ‘Not Acknowledged’ status  | 0x80000000 |
| bind_receiver         | Binds as ‘Receiver’                | 0x00000001 |
| bind_receiver_resp    | Response to bind_receiver          | 0x80000001 |
| bind_transmitter      | Binds as ‘Transmitter’             | 0x00000002 |
| bind_transmitter_resp | Response to bind_transmitter       | 0x80000002 |
| submit_sm             | Submit an SMS message              | 0x00000004 |
| submit_sm_resp        | Response to submit_sm_resp         | 0x80000004 |
| deliver_sm            | Receive an SMS or delivery receipt | 0x00000005 |
| deliver_sm_resp       | Response to deliver_sm_resp        | 0x80000005 |
| unbind                | Close bind response                | 0x00000006 |
| unbind_resp           | Response to unbind                 | 0x80000006 |
| bind_transceiver      | Bind as ‘Transceiver’              | 0x00000009 |
| bind_transceiver_resp | Response to bind_transceiver       | 0x80000009 |
| enquire_link          | Check link status                  | 0x00000015 |
| enquire_link_resp     | Response to enquire_link           | 0x80000015 |

Note that any command in the SMPP specification which isn't listed above isn't currently supported.

## Command States

SMPP supports the following commands through the following SMPP session states:

| Command               | Required state                |
| --------------------- | ----------------------------- |
| bind_transmitter      | OPEN                          |
| bind_transmitter_resp | OPEN                          |
| bind_receiver         | OPEN                          |
| bind_receiver_resp    | OPEN                          |
| bind_transceiver      | OPEN                          |
| bind_transceiver_resp | OPEN                          |
| unbind                | BOUND_TX, BOUND_RX, BOUND_TRX |
| unbind_resp           | BOUND_TX, BOUND_RX, BOUND_TRX |
| submit_sm             | BOUND_TX, BOUND_TRX           |
| submit_sm_resp        | BOUND_TX, BOUND_TRX           |
| deliver_sm            | BOUND_RX, BOUND_TRX           |
| deliver_sm_resp       | BOUND_RX, BOUND_TRX           |
| enquire_link          | BOUND_TX, BOUND_RX, BOUND_TRX |
| enquire_link_resp     | BOUND_TX, BOUND_RX, BOUND_TRX |
| generic_nack          | BOUND_TX, BOUND_RX, BOUND_TRX |

NB: `data_sm`, `query_sm`, `cancel_sm`, `replace_sm` and `submit_sm_multi` aren't supported.

`submit_sm` and `submit_sm_resp` transactions will include a message identifier and a status which identifies whether the message is valid or invalid. If invalid, an error status will be returned. Please note that the message identifier will be HEX encoded on SMPP 3.3 connections but will be a standard ASCII encoded integer on SMPP 3.4 connections.

## Delivery Receipts

SMPP delivery receipts take the following format:

**Format**

```text
id:IIIIIIIIII sub:SSS dlvrd:DDD submit date:YYMMDDhhmm done date:YYMMDDhhmm stat:DDDDDDD err:E Text .........
```

Where:

> - **id** - the message ID allocated to the message by the server
> - **sub** - the number of short messages originally submitted
> - **dlvrd** - the number of short messages delivered
> - **submit date** - the date and time at which the short message was submitted
> - **done date** - the date and time at which the short message reached its final state
> - **stat** - the final status of the message. Please see section 7.0 Message Status for more information.
> - **err** - where appropriate this may hold a network specific error code or an SMSC error code
> - **text** - the first 20 characters of the short message

Note that SMPP v3.3 and v3.4 differ, such that message IDs returned from an SMPP 3.3 connection are encoded as hex whereas 3.4 SMPP connections return message IDs as ASCII encoded integers.

## Message Status

The delivery report status indicates whether the SMS message was delivered successfully by the SMSC. If the SMS wasn't successfully delivered, the delivery report will give a reason in the form of an \[error code\].

SMPP message states and their meanings are listed here for your convenience:

| Code    | Description                         |
| ------- | ----------------------------------- |
| DELIVRD | Message delivered to destination    |
| ACCEPTD | Message is in accepted state        |
| EXPIRED | Message validity period has expired |
| DELETED | Message has been deleted            |
| UNDELIV | Message is undelivered              |
| UNKNOWN | Message is in unknown state         |
| REJECTD | Message is in rejected state        |
| ENROUTE | Message is in ENROUTE state         |

Note that some SMSCs will still return a delivery receipt when a message has been accepted or if the message is buffered in the SMSC. For example, if the handset is switched off. This will use the UNKNOWN state and sets the buffered special parameter in the deliver_sm under SMPP 3.4

## Error Codes

Sinch has a record of providing high quality and reliable reporting. Should your message not be delivered, an error code will be returned in the deliver_sm with a reason why.

These are defined here:

| Hex | Decimal | Error Name                        | Description                                                                                                                                                | Duration  | Error From | Relating To                                |
| --- | ------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- | ------------------------------------------ |
| 0   | 0       | No Error                          | The message delivered successfully                                                                                                                         | Permanent | MSC        | Mobile Handset                             |
| 1   | 1       | Unknown Subscriber                | The MSISDN is inactive or no longer active.                                                                                                                | Permanent | HLR        | Destination Network                        |
| 2   | 2       | Unknown Subscriber -npdbMismatch  | Fault in Number Portability Database or HLR of MSISDN range holder. Occurs more frequently if number ported more than once in certain countries.           | Permanent | MSC        | Destination Network                        |
| 5   | 5       | Unidentified Subscriber           | Occurs when the MSC that a message has been sent to isn't aware of the subscriber IMSI. Suggests HLR hasn't been updated or MSC malfunction.               | Temporary | MSC        | Destination Network                        |
| 6   | 6       | Unknown                           | It can't be determined whether this message has been delivered or has failed due to lack of final delivery state information from the carrier.             | Permanent | MSC        | Destination Network                        |
| 9   | 9       | Illegal Subscriber                | Rejection due to failed authentication or filtering.                                                                                                       | Temporary | MSC        | Destination Network                        |
| A   | 10      | No Translation for Address        | Destination number isn't a valid mobile number or its routing can't be determined.                                                                         | Permanent | TRANSPORT  | Signalling                                 |
| B   | 11      | Teleservice Not Provisioned       | Rejection due to subscription not supporting SMS.                                                                                                          | Permanent | HLR        | Mobile Handset/Destination Network         |
| C   | 12      | Illegal Equiptment                | Rejection due to subscription, handset or network not supporting SMS.                                                                                      | Temporary | MSC        | Mobile Handset/Destination Network         |
| D   | 13      | Call Barred                       | Rejection due to subscription or network not allowing SMS.                                                                                                 | Temporary | HLR        | Mobile Handset/Destination Network         |
| 15  | 21      | Facility Not Supported            | Rejection due to subscription not supporting SMS.                                                                                                          | Temporary | MSC        | Destination Network                        |
| 1B  | 27      | Absent Subscriber                 | Subscriber handset isn't logged onto the network due to it being turned off or out of coverage. Likely to have been unavailable for 12 hours or more.      | Temporary | HLR        | Mobile Handset                             |
| 1C  | 28      | Absent subscriber no-pageresponse | Subscriber handset isn't reachable on the network due to it being turned off or out of coverage. Likely to have very recently become unavailable.          | Temporary | MSC        | Mobile Handset                             |
| 1D  | 29      | Absent subscriber IMSI-detached   | Subscriber handset isn't reachable on the network due to it being turned off or out of coverage. Likely to have been unavailable for several hours.        | Temporary | MSC        | Mobile Handset                             |
| 1E  | 30      | Controlling MSC Failure           | The MSC that the subscriber is currently registered to is experiencing a fault.                                                                            | Temporary | MSC        | Destination Network                        |
| 1F  | 31      | Subscriber Busy For MT-SM         | MSC is busy handling an exisiting transaction with the handset. The subscriber could be currently receiving an SMS at exactly the same time.               | Temporary | MSC        | Mobile Handset                             |
| 20  | 32      | Equipment notSMEquipped           | Recieving handset or equipment doesn't support SMS or an SMS feature. This is temporary because the subscriber could switch to a different device.         | Temporary | MSC        | Mobile Handset                             |
| 21  | 33      | Memory Capacity Exceeded          | Rejection due to subscriber handset not having the memory capacity to recieve the message. Likely to have been in state for 12 hours or more.              | Temporary | HLR        | Destination Network                        |
| 22  | 34      | System Failure                    | Rejection due to SS7 protocol or network failure.                                                                                                          | Temporary | MSC        | Destination Network                        |
| 23  | 35      | Data Missing                      | Rejection due to subscriber network decoding error or signalling fault.                                                                                    | Temporary | MSC        | Destination Network                        |
| 24  | 36      | Unexpected Data Value             | Rejection due to subscriber network decoding error or signalling fault.                                                                                    | Temporary | MSC        | Destination Network                        |
| 25  | 37      | System Failure                    | Rejection due to SS7 protocol or network failure.                                                                                                          | Temporary | HLR        | Destination Network                        |
| 26  | 38      | Data Missing                      | Rejection due to subscriber network decoding error or signaling fault.                                                                                     | Temporary | HLR        | Destination Network                        |
| 27  | 39      | Unexpected Data Value             | Rejection due to subscriber network decoding error or signaling fault.                                                                                     | Temporary | HLR        | Destination Network                        |
| 28  | 40      | Memory capacity Exceeded          | Rejection due to subscriber handset not having the memory capacity to receive the message. Likely to have run out of capacity recently.                    | Temporary | MSC        | Destination Network                        |
| 45  | 69      | Generic delivery failure          | Generic delivery failure                                                                                                                                   | Permanent | MSC        | Destination Network                        |
| 8C  | 140     | SS7 Communication Error           | Internal SMSC error due to invalid message syntax.                                                                                                         | Temporary | SMSC       | Message Construction                       |
| A0  | 160     | Absent subscriber IMSI-detached   | Internal SMSC error caused by SS7 link/dialogue fault.                                                                                                     | Temporary | SMSC       | Destination Network/Signalling             |
| C8  | 200     | Unable to decode response         | SMSC can't decode the response received from destination network due to an encoding or protocol fault.                                                     | Temporary | SMSC       | Destination Network/Signalling             |
| C9  | 201     | Provider Abort                    | Subscriber network or signalling partner has terminated the signalling connection, preventing message transmission.                                        | Temporary | TRANSPORT  | Destination Network/Signalling             |
| CA  | 202     | User Abort                        | Subscriber network or signalling partner has rejected the signalling connection, preventing message transmission.                                          | Temporary | TRANSPORT  | Destination Network/Signalling             |
| CB  | 203     | Timeout                           | Subscriber network not recieving packets from SMSC, or not responding to them. Alternatively, a 3rd party signalling partner may not be routing correctly. | Temporary | TRANSPORT  | Destination Network/Signalling             |
| CD  | 205     | Timeout-PAB                       | Subscriber network or signalling partner hasn't responded to signalling connection setup or maintenance packets.                                           | Temporary | TRANSPORT  | Destination Network/Signalling             |
| CE  | 206     | Rejected                          | Subscriber network refuses signalling connection or message packet.                                                                                        | Permanent | TRANSPORT  | Destination Network                        |
| CF  | 207     | Local Cancel                      | Signalling with destination network has been prevented by SMSC partner or signalling partner.                                                              | Permanent | CARRIER    | SMSC Partner Routing/Signalling            |
| 12C | 300     | Screening or Blocking             | SMSC partner or 3rd party signalling partner has prevented messages being sent to this MSISDN or destination network.                                      | Permanent | CARRIER    | SMSC Partner Routing/Signalling            |
| 12D | 301     | Carrier Syntax Error              | SMSC partner has rejected the message due to an unacceptable message parameter.                                                                            | Permanent | CARRIER    | SMSC Partner Platform/Message Construction |
| 12E | 302     | Carrier Internal Error            | SMSC partner could not process this message due to a platform fault, but it will be retired.                                                               | Temporary | CARRIER    | SMSC Partner Platform                      |
| 12F | 303     | Carrier Internal Error            | SMSC partner could not process this message due to a platform fault and it won't be retried.                                                               | Permanent | CARRIER    | SMSC Partner Platform                      |
| 130 | 304     | Carrier Routing Error             | SMSC partner can't route this message currently, but it will be retried.                                                                                   | Temporary | CARRIER    | SMSC Partner Platform/Signalling           |
| 131 | 305     | Carrier Routing Error             | SMSC partner can't route this message and it won't be retried.                                                                                             | Permanent | CARRIER    | SMSC Partner Platform/Signalling           |
| 3E7 | 999     | Congestion                        | SS7 signalling link at destination network, SMSC, or 3rd party signalling partner is overloaded.                                                           | Temporary | TRANSPORT  | Destination Network/Signalling             |

## Terminology

- MSISDN  
  Mobile Subscriber Integrated Services Digital Network: the mobile
  number in international format.

- MSC  
  Mobile Switching Centre: the destination network equipment that
  receives an SMS (via forward-SM operation) in a destination mobile
  network.

- HLR  
  Home Location Register: the destination network equipment that
  returns status and routing information about an MSISDN to the SMSC
  (via SRI-SM operation).

- SMSC  
  Short Message Service Centre: the equipment belonging to Sinch or
  one of its carriers that transmits SMS to the destination network
  via SS7.

- SS7  
  Signalling System 7: the transport protocol that interconnects
  global GSM networks.

- MNP  
  Mobile Number Portability: the process of a subscriber moving from
  one mobile network to another, but retaining the same MSISDN.

- IMSI  
  International Mobile Subscriber Identity: a unique identification
  number which identifies the destination country, actual network, and
  network subscriber ID.

- Subscriber  
  The mobile user who has a SIM card.
