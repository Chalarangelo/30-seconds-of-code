---
title: validateEmail
tags: string,intermediate
---

Checks if a given input is a valid email address and returns `true`, if valid.

- Ensure the input value is a `String`.

```js
const validateEmail = (str) => {
  const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return check.test(String(str).toLowerCase());
};
```

```js
validateEmail("example@example.com"); // true
validateEmail("example"); // false
```
