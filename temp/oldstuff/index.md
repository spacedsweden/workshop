---
title: Publish your APIs
description: guide for building public apis
---

# Checklist for publishing a new or updated API

This guide give you an overall view on the different steps and deliverables that are required or expected by Enterprise architecture and DX for sinch.

[Learn developer portal](/developer-portal/index)

## Planning and discovery

The product managers are responsible for their APIs

- A Review is done and the template is followed at [Request Template](https://confluence.clxnetworks.net/x/5RNAB), mail christian@sinch.com to set up one.
- A getting started guide with full code examples for the main functionality of the product API/changes. (Documentation guide lines)<http://dev.eu1svcs-cngitlab001.int.clxnetworks.net/protorepo/guide/documentation.html#public-api-documentation-requirements> its ok if changes during development, but writing this up front helps us having an inside out perspective and put the external developer in focus. It will also enable you to share the proposed API to potential customers in a nicer way.
- A Rest OAS file of the API, generate from proto preferably via the rest proxy if you use that.
- Mockups on any dashboard functionality
- For public apis the following areas in the documentation are more important than compared to if its an internal API. Please be familiar with them:
- [Naming conventions](http://dev.eu1svcs-cngitlab001.int.clxnetworks.net/protorepo/guide/naming-conventions.html)
- [Documentation](http://dev.eu1svcs-cngitlab001.int.clxnetworks.net/protorepo/guide/documentation.html#documentation)
- Plan for ONE external URL, that's your product name. Plan to keep versions of an API together. It gets confusing if you version single functions.

### Enpoints and operations

You should group enpoint that feels lik they belong togehter, you should also aim for you operations to perform a task that takes the developer closer to integration. Avoid requiring more than one call to make it feel usable.

Good Example:
Buy and configure a number so a developer can send sms and call with the number in the next call

```
/numbers:buy
{
  phone_number:"+15612600684",
  sms_service_plan_id:"asdfasdfsadfa" ,
  voice_app_id:"sadfasdf fasdfa sdf asdf "
}
```

Bad example:

```
/numbers:buy
{
  phone_number:"+15612600684",

}
post /sms/configure:addNumber
{
  service_plan_id:
 phone_number:"+15612600684"
}
post voice/configure
{
 phone_number:"+15612600684"
  app_id:"asdfdsafsadf sadf asd"
}
```

## Naming

We may have reasons to keep internal names very telecom or domain specific to keep interan consumers productive. Its fine and desirable to call them something else to the world. Its ok to use general technical terms that you could expect a developer to know for example HTTPS, hmac etc. A normal developer would not understand MSID. Its also important to very clear in naming.

### Good example:

```
accounts.api.sinch.com/v1/paymentmethods
accounts.api.sinch.com/v1/api-keys
accounts.api.sinch.com/v1/usage
accounts.api.sinch.com/v1/projects
```

### Bad example

```
accounts.api.sinch.com/paymentmethods/v1
accounts.api.sinch.com/api-keys/v2
accounts.api.sinch.com/usage/v1
accounts.api.sinch.com/v3/projects
```

Its ok to add endpoints to a Major version of an API, its also ok to add to a request and response. more details in [Compatibility](http://dev.eu1svcs-cngitlab001.int.clxnetworks.net/protorepo/guide/compatibility.html). Reason is it will be difficult for an external party to understand if the lesser versions is valid in the v3 scope.

## Development

- Implement rest proxy ASAP, build and publish often to get continued feedback from DX.
- Keep getting started updated and published.

## Pre-Launch (First time you expose it to the world in any version)

- Make sure you are in the portal with as much self serve as as humanly possible. It wont scale for us to configure, and no one really wants to talk to anyone to test something.
- Create at least one quick start guide. publish it here <https://github.com/sinch/docs>
- Make sure Swagger Defs are published and are with external friendly names <https://github.com/sinch/docs>
- if your API will provide most value if integrated with other systems, identify those and write tutorials on how to integrate with those. Example, how to integrate Sinch SMS with Shippo.
- Send above for review 2 weeks before launch to DX (christian@sinch.com) and marketing.
