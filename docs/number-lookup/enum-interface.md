---
title: ENUM Interface
next:
  pages:
    - number-lookup-http-interface
    - number-lookup-glossary
description: >-
  Electronic Numbering Mapping - translate telephone numbers (E.164) into a
  format that can be used in Internet communications.
redirectFrom:
  - /docs/number-lookup-enum-interface
---

# ENUM Interface

Electronic Numbering Mapping - translate telephone numbers (E.164) into a format that can be used in Internet communications.

## ENUM Protocol

ENUM is an abbreviation for Electronic Numbering Mapping and is a protocol used to translate E.164 telephone numbers (i.e. standard telephone numbers like +447786852522) into a format that can be used in Internet communications. The parameters used in addition to IP address and port number is **NAPTR**, which is the record type used and **e164.arpa** which is the domain.

To translate an MSISDN into ENUM format you remove all non-digit characters, add dots between each digit and then reverse the order of the digits. Finally you add the domain “e164.arpa” to the end. As an example an MSISDN in E.164 format, _+447786852522_, would using ENUM translate to: _“2.2.5.2.5.8.6.8.7.7.4.4.e164.arpa”_.

## How To Connect

Please find the IP address and port number for our ENUM Lookup Server in the table below. The only identifier needed to connect is the IP address you connect from.

| Server                            | Host:Port        |
| --------------------------------- | ---------------- |
| Primary Number Lookup ENUM Server | 93.158.78.4:53   |
| Backup Number Lookup ENUM Server  | 195.84.167.34:53 |

## Query Specification

### Question

The question has the format \<IP-address> \<MSISDN-in-ENUM-Format> e164.arpa IN NAPTR

As an example the request for MSISDN +13392986156 would look like this:

**Request**

```sql
93.158.78.4 6.5.1.6.8.9.2.9.3.3.1.e164.arpa IN NAPTR

```

### Answer

The answer section will contain a NAPTR record with the MSISDN queried in ENUM format together with the MCC and MNC for the MSISDN queried.

As an example the answer section to the question above looks like this:

**Response**

```sql
6.5.1.6.8.9.2.9.3.3.1.e164.arpa. 3 IN NAPTR 10 50 “u” “E2U+pstn:tel” “!^(.*)$!tel:\\\\1\\\;mcc=310\\\;mnc=012!”

```

## Examples

Below you will find full examples of queries using the “dig” command.

### Successful Query

A successful query returns a NAPTR record containing the queried MSISDN in ENUM format as well as MCC and MNC for the MSISDN in the answer section.

**Successful Query**

```sql
dig @93.158.78.4 6.5.1.6.8.9.2.9.3.3.1.e164.arpa IN NAPTR

; < <>> DiG 9.8.3-P1 < <>> @93.158.78.4 6.5.1.6.8.9.2.9.3.3.1.e164.arpa IN NAPTR
;; ->>HEADER< <- opcode: QUERY, status: NOERROR, id: 9512
;; flags: qr; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;6.5.1.6.8.9.2.9.3.3.1.e164.arpa. IN NAPTR
;; ANSWER SECTION:
6.5.1.6.8.9.2.9.3.3.1.e164.arpa. 3 IN NAPTR 10 50 “u” “E2U+pstn:tel”
“!^(.*)$!tel:\\\\1\\\;mcc=310\\\;mnc=012!” .
;; Query time: 206 msec
```

### Unsuccessful Query

The answer to an unsuccessful query won't contain any answer section. No NAPTR record is return and the response code will be received in the status field.

```sql
dig @93.158.78.4 6.5.1.6.8.9.2.9.3.3.1.e164.arpa IN NAPTR

; < <>> DiG 9.8.3-P1 < <>> @93.158.78.4 6.5.1.6.8.9.2.9.3.3.1.e164.arpa IN NAPTR
;; ->>HEADER< <- opcode: QUERY, status: SERVFAIL, id: 9512 ;; flags: qr; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION: ;6.5.1.6.8.9.2.9.3.3.1.e164.arpa. IN NAPTR ;; Query time: 202 msec
```

## Response Codes

The list below specifies the Response Codes that can be returned.

| Response Code | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| 0 (NO ERROR)  | Successful query - answer section is returned.              |
| 2 (SERVFAIL)  | Improperly formatted query - no answer section is returned. |
| 3 (NXDOMAIN)  | MSISDN not valid - no answer section is returned.           |
| 5 (REFUSED)   | Source IP is unauthorized - no answer section is returned.  |
