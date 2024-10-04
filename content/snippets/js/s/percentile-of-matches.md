---
title: Percentile of matches in a JavaScript array
shortTitle: Percentile of matches
language: javascript
tags: [math]
cover: collab-desk-2
excerpt: Calculate the percentage of numbers in the given array that are less or equal to the given value.
listed: true
dateModified: 2024-08-02
---

Given an array of numbers, you might want to calculate the **percentage of numbers** that are **less or equal to a given value**. This is known as the **percentile** of the matches. You can achieve this by counting the numbers that are less than the given value and those that are equal to it, and then applying the percentile formula.

In order to do so, you can use `Array.prototype.reduce()` to calculate how many numbers are below the value and how many are the same value. Then, you can apply the percentile formula to get the final result.

```js
const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55
```
