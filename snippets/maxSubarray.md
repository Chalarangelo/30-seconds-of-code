---
title: Maximum subarray
tags: algorithm,math,array
author: chalarangelo
cover: blog_images/work-hard-computer.jpg
expertise: intermediate
firstSeen: 2022-09-07T05:00:00-04:00
---

Finds a contiguous subarray with the largest sum within an array of numbers.

- Use a greedy approach to keep track of the current `sum` and the current maximum, `maxSum`. Set `maxSum` to `-Infinity` to make sure that the highest negative value is returned, if all values are negative.
- Define variables to keep track of the maximum start index, `sMax`, maximum end index, `eMax` and current start index, `s`.
- Use `Array.prototype.forEach()` to iterate over the values and add the current value to the `sum`.
- If the current `sum` is greater than `maxSum`, update the index values and the `maxSum`.
- If the `sum` is below `0`, reset it to `0` and update the value of `s` to the next index.
- Use `Array.prototype.slice()` to return the subarray indicated by the index variables.

```js
const maxSubarray = (...arr) => {
  let maxSum = -Infinity,
    sum = 0;
  let sMax = 0,
    eMax = arr.length - 1,
    s = 0;

  arr.forEach((n, i) => {
    sum += n;
    if (maxSum < sum) {
      maxSum = sum;
      sMax = s;
      eMax = i;
    }

    if (sum < 0) {
      sum = 0;
      s = i + 1;
    }
  });

  return arr.slice(sMax, eMax + 1);
};

```

```js
maxSubarray(-2, 1, -3, 4, -1, 2, 1, -5, 4); // [4, -1, 2, 1]
```
