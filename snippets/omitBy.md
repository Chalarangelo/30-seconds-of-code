---
title: omitBy
tags: object,intermediate
---

Creates an object composed of the properties the given function returns falsy for. The function is invoked with two arguments: (value, key).

- Use `Object.keys(obj)` and `Array.prototype.filter()`to remove the keys for which `fn` returns a truthy value.
- Use `Array.prototype.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.

```js
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

```js
omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }
```
