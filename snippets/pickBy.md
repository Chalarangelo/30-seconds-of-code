---
title: Pick matching object keys
tags: object
expertise: intermediate
firstSeen: 2018-01-19T13:23:45+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Creates an object composed of the properties the given function returns truthy for.

- Use `Object.keys()` and `Array.prototype.filter()`to remove the keys for which `fn` returns a falsy value.
- Use `Array.prototype.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.
- The callback function is invoked with two arguments: (value, key).

```js
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

```js
pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number');
// { 'a': 1, 'c': 3 }
```
