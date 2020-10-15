---
title: Email Validator
tags: regex,intermediate
---

Determines if the given string is a valid email address or not.

- The regex is according to the official [RFC 5322 standard for email addresses](https://www.ietf.org/rfc/rfc5322.txt).
- It should work for 99.99% of the cases because a perfect regex for emails does not exist, to know more about it, check [this out](https://www.regular-expressions.info/email.html).

```js
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

```js
email_regex.test("abc@example.com"); // true
email_regex.test("abc@xyz@example.com"); // false
email_regex.test("example@gmail.edu"); // true
email_regex.test("xyz@yahoo"); // false
```
