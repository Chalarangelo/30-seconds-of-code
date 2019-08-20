# isemail

Node email address validation library

[![Build Status](https://travis-ci.org/hapijs/isemail.svg?branch=master)](https://travis-ci.org/hapijs/isemail)<a href="#footnote-1"><sup>&#91;1&#93;</sup></a>

Lead Maintainer: [Eli Skeggs][skeggse]

This library is a port of the PHP `is_email` function by Dominic Sayers.

Install
=======

```sh
$ npm install isemail
```

Test
====

The tests were pulled from `is_email`'s extensive [test suite][tests] on October 15, 2013. Many thanks to the contributors! Additional tests have been added to increase code coverage and verify edge-cases.

Run any of the following.

```sh
$ lab
$ npm test
$ make test
```

_remember to_ `npm install` to get the development dependencies!

API
===

validate(email, [options])
--------------------------

Determines whether the `email` is valid or not, for various definitions thereof. Optionally accepts an `options` object. Options may include `errorLevel`.

Use `errorLevel` to specify the type of result for `validate()`. Passing a `false` literal will result in a true or false boolean indicating whether the email address is sufficiently defined for use in sending an email. Passing a `true` literal will result in a more granular numeric status, with zero being a perfectly valid email address. Passing a number will return `0` if the numeric status is below the `errorLevel` and the numeric status otherwise.

The `tldBlacklist` option can be either an object lookup table or an array of invalid top-level domains. If the email address has a top-level domain that is in the whitelist, the email will be marked as invalid.

The `tldWhitelist` option can be either an object lookup table or an array of valid top-level domains. If the email address has a top-level domain that is not in the whitelist, the email will be marked as invalid.

The `allowUnicode` option governs whether non-ASCII characters are allowed. Defaults to `true` per RFC 6530.

Only one of `tldBlacklist` and `tldWhitelist` will be consulted for TLD validity.

The `minDomainAtoms` option is an optional positive integer that specifies the minimum number of domain atoms that must be included for the email address to be considered valid. Be careful with the option, as some top-level domains, like `io`, directly support email addresses.

As of `3.1.1`, the `callback` parameter is deprecated, and will be removed in `4.0.0`.

### Examples

```js
$ node
> var Isemail = require('isemail');
undefined
> Isemail.validate('test@iana.org');
true
> Isemail.validate('test@iana.123');
true
> Isemail.validate('test@iana.org', {errorLevel: true});
0
> Isemail.validate('test@iana.123', {errorLevel: true});
10
> Isemail.validate('test@iana.123', {errorLevel: 17});
0
> Isemail.validate('test@iana.123', {errorLevel: 10});
10
> Isemail.validate('test@iana&12');
false
> Isemail.validate('test@iana&12', {errorLevel: true});
65
> Isemail.validate('test@', {errorLevel: true});
131
```

<sup name="footnote-1">&#91;1&#93;</sup>: if this badge indicates the build is passing, then isemail has 100% code coverage.

[skeggse]: https://github.com/skeggse "Eli Skeggs"
[tests]: http://isemail.info/_system/is_email/test/?all‎ "is_email test suite"
