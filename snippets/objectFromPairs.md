---
title: Object from pairs
tags: object,array,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Creates an object from the given key-value pairs.

- Use `Array.prototype.reduce()` to create and combine key-value pairs.
- [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) provides similar functionality.

```js
const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});
```

```js
objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}
```
