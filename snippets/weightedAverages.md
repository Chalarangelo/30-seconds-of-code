---
title: weighted average
tags: math,array,beginner
---

Returns the weighted average of two or more numbers.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const weightedAverage = (...nums,...weights) => nums.reduce((acc, w*val) => acc + w*val, 0) / nums.length;
```

```js
weightedAverage(...[1, 2, 3],..[0.6,0.2,0.3]); // 0.2
```
