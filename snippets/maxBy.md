---
title: maxBy
tags: math,array,beginner
firstSeen: 2018-01-11T12:25:54+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Returns the maximum value of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Math.max()` to get the maximum value.

```js
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
```

```js
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
```
