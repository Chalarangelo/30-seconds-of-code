---
title: Partial sum array
tags: math,array
author: chalarangelo
cover: river-house-lights
firstSeen: 2020-05-04T12:20:46+03:00
lastUpdated: 2022-01-30T13:10:13+02:00
---

Creates an array of partial sums.

- Use `Array.prototype.reduce()`, initialized with an empty array accumulator to iterate over `nums`.
- Use `Array.prototype.slice()` to get the previous partial sum or `0` and add the current element to it.
- Use the spread operator (`...`) to add the new partial sum to the accumulator array containing the previous sums.

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], []);
```

```js
accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```
