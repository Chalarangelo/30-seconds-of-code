---
title: Value is async function
type: snippet
tags: [type,function]
author: chalarangelo
cover: interior-12
dateModified: 2020-10-20T11:21:07+03:00
---

Checks if the given argument is an `async` function.

- Use `Object.prototype.toString()` and `Function.prototype.call()` and check if the result is `'[object AsyncFunction]'`.

```js
const isAsyncFunction = val =>
  Object.prototype.toString.call(val) === '[object AsyncFunction]';
```

```js
isAsyncFunction(function() {}); // false
isAsyncFunction(async function() {}); // true
```
