---
title: Value is generator function
type: snippet
tags: [type,function]
author: chalarangelo
cover: interior-4
dateModified: 2020-10-20T11:21:07+03:00
---

Checks if the given argument is a generator function.

- Use `Object.prototype.toString()` and `Function.prototype.call()` and check if the result is `'[object GeneratorFunction]'`.

```js
const isGeneratorFunction = val =>
  Object.prototype.toString.call(val) === '[object GeneratorFunction]';
```

```js
isGeneratorFunction(function() {}); // false
isGeneratorFunction(function*() {}); // true
```
