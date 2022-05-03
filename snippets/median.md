---
title: Median
tags: math,array
expertise: intermediate
cover: blog_images/old-consoles.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
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
