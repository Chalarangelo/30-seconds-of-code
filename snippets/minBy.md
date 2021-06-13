---
title: minBy
tags: math,array,beginner
firstSeen: 2018-01-11T12:25:54+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Returns the minimum value of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Math.min()` to get the minimum value.

```js
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
```

```js
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
```
