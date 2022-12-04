---
title: Value is generator function
tags: type,function
author: chalarangelo
cover: blog_images/interior-4.jpg
firstSeen: 2020-08-07T15:40:38+03:00
lastUpdated: 2020-10-20T11:21:07+03:00
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
