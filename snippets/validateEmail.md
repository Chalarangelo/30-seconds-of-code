---
title: validateEmail
tags: array,intermediate
---
Returns `true` if the given value has a valid email format, `false` otherwise.
Explain briefly what the snippet does.

- Validate an email based on a regular expression
- The regular expression was used in a lot of tests that you can see [here](http://jsfiddle.net/ghvj4gy9/)

```js
const validateEmail = email => {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
}
```

```js
validateEmail('30seconds@gmail.com') // true
validateEmail('30seconds.gmail.com') // false
```
