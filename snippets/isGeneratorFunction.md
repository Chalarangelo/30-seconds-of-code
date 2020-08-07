---
title: isGeneratorFunction
tags: type,function,intermediate
---

Checks if the given argument is a generator function.

Use `Object.prototype.toString()` and `Function.call()` and check if the result is `'[object GeneratorFunction]'`.

```js
const isGeneratorFunction = val =>
  Object.prototype.toString.call(val) === '[object GeneratorFunction]';
```

```js
isGeneratorFunction(function() {}); // false
isGeneratorFunction(function*() {}); // true
```
