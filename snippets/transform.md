---
title: transform
tags: object,intermediate
---

Applies a function against an accumulator and each key in the object (from left to right).

- Use `Object.keys(obj)` to iterate over each key in the object, `Array.prototype.reduce()` to call the apply the specified function against the given accumulator.

```js
const transform = (obj, fn, acc) => Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);
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
