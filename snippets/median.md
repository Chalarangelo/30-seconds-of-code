---
title: median
tags: math,array,intermediate
---

Returns the median of an array of numbers.

- Find the middle of the array, use `Array.prototype.sort()` to sort the values.
- Return the number at the midpoint if `length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const nums = [...arr].sort((a, b) => a - b);
  return (nums[Math.floor((nums.length + 1) / 2) - 1] + nums[Math.ceil((nums.length + 1) / 2) - 1]) / 2
};
```

```js
median([5, 6, 50, 1, -5]); // 5
median([1, 2, 3, 4, 5, 6, 8, 9]); // 4.5
```
