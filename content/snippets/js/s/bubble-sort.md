---
title: Bubble sort
language: javascript
tags: [algorithm,array]
cover: sail-away-2
excerpt: Sort an array of numbers, using the bubble sort algorithm.
listed: true
dateModified: 2023-12-16
---

## Definition

[Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort) is a simple **sorting algorithm** that repeatedly **steps through** the array, **compares** adjacent elements and **swaps** them if they are in the wrong order. The pass through the array is **repeated** until the array is sorted.

## Implementation

- Declare a variable, `swapped`, that indicates if any values were swapped during the current iteration.
- Use the spread operator (`...`) to clone the original array, `arr`.
- Use a `for` loop to iterate over the elements of the cloned array, terminating before the last element.
- Use a nested `for` loop to iterate over the segment of the array between `0` and `i`, swapping any adjacent out of order elements and setting `swapped` to `true`.
- If `swapped` is `false` after an iteration, no more changes are needed, so the cloned array is returned.

```js
const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]
```

## Complexity

The algorithm has an [average time complexity](/js/s/big-o-cheatsheet#array-sorting-algorithms) of `O(n^2)`, where `n` is the size of the input array.
