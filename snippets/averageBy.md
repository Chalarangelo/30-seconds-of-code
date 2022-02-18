---
title: Mapped array average
tags: math,array,intermediate
firstSeen: 2018-01-11T12:25:54+02:00
lastUpdated: 2020-10-21T21:17:45+03:00
---

Calculates the average of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;
```

```js
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 5
```
