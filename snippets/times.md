---
title: times
tags: function,intermediate
firstSeen: 2018-01-24T13:50:49+02:00
lastUpdated: 2020-10-20T11:21:07+03:00
---

Iterates over a callback `n` times

- Use `Function.prototype.call()` to call `fn` `n` times or until it returns `false`.
- Omit the last argument, `context`, to use an `undefined` object (or the global object in non-strict mode).

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
