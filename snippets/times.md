---
title: times
tags: function,intermediate
---

Iterates over a callback `n` times

Use `Function.call()` to call `fn` `n` times or until it returns `false`.
Omit the last argument, `context`, to use an `undefined` object (or the global object in non-strict mode).

```js
const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};
```

```js
var output = '';
times(5, i => (output += i));
console.log(output); // 01234
```