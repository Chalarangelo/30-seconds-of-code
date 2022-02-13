---
title: Transform object
tags: object,intermediate
firstSeen: 2018-01-12T13:55:49+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Applies a function against an accumulator and each key in the object (from left to right).

- Use `Object.keys()` to iterate over each key in the object.
- Use `Array.prototype.reduce()` to apply the specified function against the given accumulator.

```js
const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);
```

```js
transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }
```
