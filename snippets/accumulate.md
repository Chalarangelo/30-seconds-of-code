---
title: accumulate
tags: math,array,intermediate
firstSeen: 2020-05-04T12:20:46+03:00
lastUpdated: 2020-11-03T21:46:13+02:00
---

Creates an array of partial sums.

- Use `Array.prototype.reduce()`, initialized with an empty array accumulator to iterate over `nums`.
- Use `Array.prototype.slice(-1)`, the spread operator (`...`) and the unary `+` operator to add each value to the accumulator array containing the previous sums.

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)], []);
```

```js
accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```
