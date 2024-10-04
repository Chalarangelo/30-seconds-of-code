---
title: Selection sort
language: javascript
tags: [algorithm,array]
cover: yellow-sofa
excerpt: Sort an array of numbers, using the selection sort algorithm.
listed: true
dateModified: 2023-12-16
---

## Definition

[Selection sort](https://en.wikipedia.org/wiki/Selection_sort) is an **in-place comparison sorting algorithm**. It divides the input array into a **sorted** and an **unsorted** subarray. It then repeatedly **finds the minimum element** in the unsorted subarray and **swaps** it with the leftmost element in the unsorted subarray, moving the subarray boundaries one element to the right.

## Implementation

- Use the spread operator (`...`) to clone the original array, `arr`.
- Use a `for` loop to iterate over elements in the array.
- Use `Array.prototype.slice()` and `Array.prototype.reduce()` to find the index of the minimum element in the subarray to the right of the current index. Perform a swap, if necessary.

```js
const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```

## Complexity

The algorithm has an [average time complexity](/js/s/big-o-cheatsheet#array-sorting-algorithms) of `O(n^2)`, where `n` is the size of the input array.
