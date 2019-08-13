---
title: squareSum
tags: math,beginner
---

Squares each number in an array and then sums the results together.

Use `Array.prototype.reduce()` in combination with `Math.pow()` to iterate over numbers and sum their squares into an accumulator.

```js
const squareSum = (arr) => arr.reduce((squareSum, number) =>
  squareSum + Math.pow(number, 2), 0);
```

```js
squareSum(1, 2, 2); // 9
```
