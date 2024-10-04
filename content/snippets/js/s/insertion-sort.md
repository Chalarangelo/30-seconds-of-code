---
title: Insertion sort
language: javascript
tags: [algorithm,array]
cover: white-tablet-2
excerpt: Sort an array of numbers, using the insertion sort algorithm.
listed: true
dateModified: 2023-12-16
---

## Definition

[Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort) is a **simple sorting algorithm** that builds the final sorted array **one element at a time**. It uses **comparison** to find the correct position to insert the current element at, in order to maintain the sorted subarray.

## Implementation

- Use `Array.prototype.reduce()` to iterate over all the elements in the given array.
- If the `length` of the accumulator is `0`, add the current element to it.
- Use `Array.prototype.some()` to iterate over the results in the accumulator until the correct position is found.
- Use `Array.prototype.splice()` to insert the current element into the accumulator.

```js
const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

## Complexity

The algorithm has an [average time complexity](/js/s/big-o-cheatsheet#array-sorting-algorithms) of `O(n^2)`, where `n` is the size of the input array.
