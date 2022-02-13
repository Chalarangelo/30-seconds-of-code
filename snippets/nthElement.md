---
title: Nth element
tags: array,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Returns the nth element of an array.

- Use `Array.prototype.slice()` to get an array containing the nth element at the first place.
- If the index is out of bounds, return `undefined`.
- Omit the second argument, `n`, to get the first element of the array.

```js
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
```

```js
nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'
```
