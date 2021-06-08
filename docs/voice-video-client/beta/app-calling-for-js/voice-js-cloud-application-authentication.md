---
title: Authentication & Authorization
excerpt: Secure your application and authorize Sinch client (user) registrations.
hidden: false
next:
  pages:
    - voice-android-cloud-calling
---

When you initiate `SinchClient`, or register user via `UserController` you have to provide _user identity_. The first time the application instance and the Sinch client are running on behalf of a particular user, it is required to register against the Sinch service. The step of registering a user identity against the Sinch service requires the application instance to provide a token that authenticates the _Application_ and grants permission (authorizes) the user to register. Once the application instance has successfully registered the user identity, the client will have obtained the necessary credentials to perform further authorized requests on behalf of the _Application_ and for that specific user to make and receive calls.

## Token-based User Registration - Overview

To authorize the registration of a user, the application must provide a registration token to the `SinchClient` or `UserController`. This token should be in the form of a [JSON Web Token (JWT)](https://jwt.io/) signed with a signing key derived from the _Application Secret_.

The recommended way to implement this authentication scheme is that the _Application Secret_ should be kept securely on your server-side backend, the signed token should be created and signed on your server, then passed via a secure channel to the application instance and Sinch client running on a device.

![Token-based User Registration](images\20210125-token_based_user_registration.pu.png)

The following sections describes, in detail, how to create and sign the _JWT_, and how to provide it to the `SinchClient` or `UserController`.

## Creating a Registration Token

### JWT Header

A registration token is a _JWT_ with the following JWT header parameters:

| Header Parameter | Value           | Note                                               |
| ---------------- | :-------------- | :------------------------------------------------- |
| `alg`            | `HS256`         |
| `kid`            | `hkdfv1-{DATE}` | Where `{DATE}` is date in UTC on format `YYYYMMDD` |

Example of JWT header:

```json
{
  "alg": "HS256",
  "kid": "hkdfv1-20200102"
}
```

### JWT Claims

The JWT must contain the following _claims_:

| Claim   | Value / Description                                                               |
| :------ | :-------------------------------------------------------------------------------- |
| `iss`   | `//rtc.sinch.com/applications/{APPLICATION_KEY}`                             |
| `sub`   | `//rtc.sinch.com/applications/{APPLICATION_KEY}/users/{USER_ID}`           |
| `iat`   | See [JWT RFC 7519 section-4.1.1](https://tools.ietf.org/html/rfc7519#4.1.1)       |
| `exp`   | See [JWT RFC 7519 section-4.1.4](https://tools.ietf.org/html/rfc7519#4.1.4)       |
| `nonce` | A unique cryptographic [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) |

> ❗️
>
> The expiration time for the token itself (`exp`) should be set so that the _Time-to-Live_ of the token is not less than 1 minute.

### Signing the JWT

The _JWT_ should be signed using a _signing key_ derived from the _Sinch Application Secret_ as follows. Given:

- A function `HMAC256(key, message)`.
- A date-formatting function `FormatDate(date, format)`.
- The current date as variable `now`.
- _Sinch Application Secret_ as variable `applicationSecret`, holding the secret as a _base64_ encoded string.

Derive the signing key as follows:

```text
signingKey = HMAC256(BASE64-DECODE(applicationSecret), UTF8-ENCODE(FormatDate(now, "YYYYMMDD")))
```

### Examples

Given the following input:

- _Application Key_ = `a32e5a8d-f7d8-411c-9645-9038e8dd051d`
- _Application Secret_ = `ax8hTTQJF0OPXL32r1LHMA==` (in _base64_ encoded format)
- _User ID_ = `foo`
- _nonce_ = `6b438bda-2d5c-4e8c-92b0-39f20a94b34e`
- Current time: `2018-01-02 03:04:05 UTC`
- JWT expiry = 600 seconds (`exp` will be set to 600 seconds after `iat`)

We can construct a JWT as follows:

__JWT Header__:

```json
{
  "alg": "HS256",
  "kid": "hkdfv1-20180102"
}
```

__JWT Payload__:

```json
{
  "iss": "//rtc.sinch.com/applications/a32e5a8d-f7d8-411c-9645-9038e8dd051d",
  "sub": "//rtc.sinch.com/applications/a32e5a8d-f7d8-411c-9645-9038e8dd051d/users/foo",
  "iat": 1514862245,
  "exp": 1514862845,
  "nonce":"6b438bda-2d5c-4e8c-92b0-39f20a94b34e"
}
```

__Derived Signing Key__:

The derived signing key would in this case be `AZj5EsS8S7wb06xr5jERqPHsraQt3w/+Ih5EfrhisBQ=` (_base64_ encoded format)

__Final Encoded JWT__:

> 📘
>
> JWT below is only one of many possible JWT encodings of the input above. The example below is with the JSON header and payload as shown above, but with compact/minified JSON serialization and with dictionary key ordering preserved.

```jwt
eyJhbGciOiJIUzI1NiIsImtpZCI6ImhrZGZ2MS0yMDE4MDEwMiJ9.eyJpc3MiOiIvL3J0Yy5zaW5jaC5jb20vYXBwbGljYXRpb25zL2EzMmU1YThkLWY3ZDgtNDExYy05NjQ1LTkwMzhlOGRkMDUxZCIsInN1YiI6Ii8vcnRjLnNpbmNoLmNvbS9hcHBsaWNhdGlvbnMvYTMyZTVhOGQtZjdkOC00MTFjLTk2NDUtOTAzOGU4ZGQwNTFkL3VzZXJzL2ZvbyIsImlhdCI6MTUxNDg2MjI0NSwiZXhwIjoxNTE0ODYyODQ1LCJub25jZSI6IjZiNDM4YmRhLTJkNWMtNGU4Yy05MmIwLTM5ZjIwYTk0YjM0ZSJ9.EUltTTD4fxhkwCgLgj6qSQXKawpwQ952Ywm3OwQSARo
```

More detailed examples on how to implement this in various languages, including reference data for unit tests, is available at [https://github.com/sinch/sinch-rtc-api-auth-examples](https://github.com/sinch/sinch-rtc-api-auth-examples).

For additional information about _JWT_, along with a list of available libraries for generating signed _JWTs_, see [https://jwt.io](https://jwt.io). For detailed information about the _JWT_ specification, see [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519).

## Providing a Registration Token to `SinchClient`

When starting the client (`SinchClient.start()`) the client will ask for a token via [SinchClientListener.onCredentialsRequired()](reference\com\sinch\android\rtc\SinchClientListener.html)

```java
    // Instantiate a SinchClient using the SinchClientBuilder.
    android.content.Context context = this.getApplicationContext();
    SinchClient sinchClient = Sinch.getSinchClientBuilder().context(context)
                                   .applicationKey("<application key>")
                                   .environmentHost("ocra.api.sinch.com")
                                   .userId("<user id>")
                                   .build();

    sinchClient.addSinchClientListener(sinchClientListener);
    sinchClient.start()
```

In your `SinchClientListener` class:

```java
    @Override
    public void onCredentialsRequired(ClientRegistration clientRegistration) {
        yourAuthServer.getRegistrationToken(userId, new YourAuthCallback() {
            void onSuccess(String token) {
                clientRegistration.register(token);
            }
            void onFailure() {
                clientRegistration.registerFailed();
            }
        });
    }
```

> 📘
>
> The client _MAY_ also ask for a registration token on subsequent starts.

## Providing a Registration Token to `UserController`

_UserController_ is a component that serves the purpose of registration against the _Sinch Backend_ to receive incoming calls via _Managed Push_. More about it can be found later in the chapter [UserController](doc:voice-android-cloud-user-controller).

To provide the registration token to `UserController` use the similar scheme:

```java
    UserController userController = Sinch.getUserControllerBuilder()
        .context(getApplicationContext())
        .applicationKey("<application key>")
        .userId("<user id>")
        .environmentHost("ocra.api.sinch.com")
        .build();
    userController.registerUser(userRegistrationCallback, pushTokenRegistrationCallback);
```

Provide signed registration token in your [UserRegistrationCallback.onCredentialsRequired()](reference\com\sinch\android\rtc\UserRegistrationCallback.html)

```java
    // your UserRegistrationCallback implementation
    ...
    @Override
    public void onCredentialsRequired(ClientRegistration clientRegistration) {
        yourAuthServer.getRegistrationToken(userId, new YourAuthCallback() {
            void onSuccess(String token) {
                clientRegistration.register(token);
            }
            void onFailure() {
                clientRegistration.registerFailed();
            }
        });
    }

    @Override
    public void onUserRegistered() {
        //notify successfull registration
    }

    @Override
    public void onUserRegistrationFailed(SinchError error) {
        //notify failed registration
    }
```

## Limiting Client Registration with Expiration Time

Depending on your security requirements, you may want to limit a client registration time-to-live (TTL). Limiting the client registration will effectively limit the Sinch client acting on behalf of the _User_ on the particular device after the TTL has expired. This will prevent the client from making or receiving calls after the registration TTL has expired.

To limit the registration in time, create the _JWT_ as described in the sections above, but with the additional claim `sinch:rtc:instance:exp`. The value for this claim should be in the same format as claims `iat` and `exp`, i.e. a JSON numeric value representing the number of seconds since _Unix Epoch_ (UTC).

__Example JWT Payload__:

```json
{
  "iss": "//rtc.sinch.com/applications/a32e5a8d-f7d8-411c-9645-9038e8dd051d",
  "sub": "//rtc.sinch.com/applications/a32e5a8d-f7d8-411c-9645-9038e8dd051d/users/foo",
  "iat": 1514862245,
  "exp": 1514862845,
  "nonce":"6b438bda-2d5c-4e8c-92b0-39f20a94b34e",
  "sinch:rtc:instance:exp": 1515035045
}
```

**IMPORTANT**: TTL of the registration must be `>=` 48 hours. In other words: `sinch:rtc:instance:exp - iat >= 48 * 3600`.

> 📘
> When a Sinch client registers with a _User_ registration token, the registration is also bound to the particular device. Limiting the TTL of the registration is device-specific and does not affect other potential registrations for the same _User_ but on other devices.
>
> ❗️
> Do not mix up the claim `sinch:rtc:instance:exp` with the standard JWT claim [`exp`](https://tools.ietf.org/html/rfc7519#section-4.1.4). The former is for limiting the client registration. The latter is only for limiting the TTL of the JWT itself.

### Automatic Extension of Client Registration Time-to-Live (TTL)

The Sinch client will automatically request to extend the TTL of its registration by invoking [SinchClientListener.onCredentialsRequired()](reference\com\sinch\android\rtc\SinchClientListener.html)

The request to extend the client registration TTL is triggered when the Sinch client is started and the expiry of TTL is detected to be _near_ in the future. _"Near in the future"_ is subject to internal implementation details, but the Sinch client will try to eagerly extend its registration and will adjust the interval according to the TTL.

> ❗️
> It is not allowed to provide a JWT without specifying registration TTL if a JWT _with_ a limited TTL has been used before for the given _User_ on the specific device. Once a Sinch client registration has initially been constrained with a TTL, the registration can be extended in time, but not extended indefinitely.
