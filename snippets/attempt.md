---
title: attempt
tags: function,intermediate
firstSeen: 2018-01-28T14:44:40+02:00
lastUpdated: 2020-10-18T20:24:28+03:00
---

Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.

- Use a `try...catch` block to return either the result of the function or an appropriate error.
- If the caught object is not an `Error`, use it to create a new `Error`.

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};
```

```js
var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = []
```
