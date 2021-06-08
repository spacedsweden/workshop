---
title: SDKs
excerpt: >-
  The Sinch SMS Java SDK help you interact with the SMS API from your Java Application. This guide helps you set up SMS SDK in your application.
---

# Install Sinch SMS Java Library

The Sinch SMS Java SDK help you interact with the SMS API from your Java Application. This guide helps you set up SMS SDK in your application.

> We also provide SDKS for
>
> - [PHP](https://packagist.org/packages/clxcommunications/sdk-xms)
> - [Python](https://pypi.python.org/pypi/clx-sdk-xms)

## Installing with a package manager

```javascript Gradle (build.gradle)
dependencies {
implementation 'com.sinch:sdk-sms:1.*'
}

//Sinch SDK i hosted by maven so make you have MavenCetnral in your repositories
repositories {
    mavenCentral()
}
```

```javascript Maven (pom.xml)
//In **Maven**, please put the lines below in your **pom.xml**
<dependency>
  <dependency>
      <groupId>com.sinch</groupId>
      <artifactId>sdk-sms</artifactId>
      <version>1.0.4</version>
  </dependency>
```

## Install JAR

While we recommend using a package manager to track the dependencies in your application, it's possible to download and use the Java SDK by [downloading a pre-built jar file](https://repo1.maven.org/maven2/com/sinch/sdk-sms/). Select the directory for the latest version and download one of these jar files:

- sdk-sms-{version}-jar-with-dependencies.jar
- sdk-sms-{version}.jar

## Importing jar with IntelliJ

Follow this step:

`File -> Project Structure -> Modules -> Plus Sign -> Browse the SDK SMS Jar.`

## Importing jar with Eclipse

Follow this step:

`Project -> Build Path -> Configure Build Path -> Libraries -> Add Jar.`

[Send and receive SMS with Java](/docs/sms/getting-started/java/javasend.md)
