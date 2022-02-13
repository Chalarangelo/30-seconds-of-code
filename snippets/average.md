---
title: Average of numbers
tags: math,array,beginner
firstSeen: 2017-12-29T13:29:49+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Calculates the average of two or more numbers.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.
- Divide the resulting array by its length.

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
```

```js
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```
