---
title: mean
tags: math,array,intermediate
---

Returns the mean (average) of an array of numbers.

- Calculate the sum of the array using `Array.prototype.reduce()` method.
- Return the average which is the sum divided by the count (`length`) of the array.

```js
const mean = arr => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};
```

```js
mean([1, 2, 3, 4, 5, 6]) // 3.5
```
