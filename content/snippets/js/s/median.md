---
title: Median
type: snippet
language: javascript
tags: [math]
cover: last-light
dateModified: 2020-10-22
---

Calculates the median of an array of numbers.

- Find the middle of the array, use `Array.prototype.sort()` to sort the values.
- Return the number at the midpoint if `Array.prototype.length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
```

```js
median([5, 6, 50, 1, -5]); // 5
```
