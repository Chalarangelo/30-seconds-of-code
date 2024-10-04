---
title: Find the maximum subarray of a JavaScript array
shortTitle: Maximum subarray
language: javascript
tags: [algorithm,math,array]
cover: work-hard-computer
excerpt: Learn how to find the contiguous subarray with the largest sum within an array of numbers in JavaScript.
listed: true
dateModified: 2024-08-03
---

Finding the **maximum contiguous subarray** within an array of numbers is a common problem in computer science. It's often used to solve coding challenges and interview questions. The problem can be solved using a **greedy approach** that keeps track of the current sum and the maximum sum found so far.

Define variables to keep track of the **maximum start index**, `sMax`, **maximum end index**, `eMax` and **current start index**, `s`. Starting with a `maxSum` of `-Infinity` and a `sum` of `0`, use `Array.prototype.forEach()` to **iterate over the array** and add elements to the sum.

If the sum becomes **negative**, reset it to `0` and update the value of `s` to the next index. If the sum is **greater than the maximum** sum found so far, update the maximum sum and the start and end indices of the subarray. Finally, return the subarray using `Array.prototype.slice()`.

```js
const maxSubarray = (...arr) => {
  let maxSum = -Infinity, sum = 0;
  let sMax = 0, eMax = arr.length - 1, s = 0;

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


maxSubarray(-2, 1, -3, 4, -1, 2, 1, -5, 4); // [4, -1, 2, 1]
```
