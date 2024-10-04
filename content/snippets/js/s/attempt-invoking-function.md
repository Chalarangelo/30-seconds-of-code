---
title: Attempt invoking a JavaScript function
shortTitle: Attempt invoking function
language: javascript
tags: [function]
cover: spanish-resort
excerpt: Wrap a function call in a `try...catch` block to handle errors and return the result or the caught error object.
listed: true
dateModified: 2024-07-27
---

While `try...catch` blocks are commonly used to handle errors, they're not particularly friendly to the **functional programming** style. Luckily, we can roll up our own utility function to make it easier to handle errors when invoking functions.

All that we need is a [higher-order function](/js/s/higher-order-functions) that takes a function and its arguments. It then uses a `try...catch` block to return either the **result** of the function or an appropriate **error** object. If the caught object is not an `Error`, it creates a new `Error` object.

```js
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};

let elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = []
```
