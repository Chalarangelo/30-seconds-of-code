---
title: Merge sort
language: javascript
tags: [algorithm,array,recursion]
cover: balloons-field
excerpt: Sort an array of numbers, using the merge sort algorithm.
listed: true
dateModified: 2023-12-16
---

## Definition

[Merge sort](https://en.wikipedia.org/wiki/Merge_sort) is an **efficient, general-purpose, comparison-based sorting algorithm**. Merge sort is a **divide and conquer algorithm**, based on the idea of breaking down a array into several subarrays until each one consists of a single element and **merging those subarrays** in a manner that results into a **sorted array**.

## Implementation

- Use recursion.
- If the `length` of the array is less than `2`, return the array.
- Use `Math.floor()` to calculate the middle point of the array.
- Use `Array.prototype.slice()` to slice the array in two and recursively call `mergeSort()` on the created subarrays.
- Finally, use `Array.from()` and `Array.prototype.shift()` to combine the two sorted subarrays into one.

```js
const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```

## Complexity

The algorithm has an [average time complexity](/js/s/big-o-cheatsheet#array-sorting-algorithms) of `O(n log n)`, where `n` is the size of the input array.
