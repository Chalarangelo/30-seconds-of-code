---
title: Binary search in a sorted JavaScript array
shortTitle: Binary search
language: javascript
tags: [algorithm,array]
cover: zen-indoors
excerpt: Use the binary search algorithm to find the index of a given element in a sorted array.
listed: true
dateModified: 2024-07-20
---

The [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search) is a fast and efficient way to **find the index of a given element in a sorted array**. It works by repeatedly dividing the search interval in half, narrowing down the possible locations of the element.

A binary search is much faster than a [linear search](/js/s/linear-search), especially for large arrays, as it has a **time complexity** of `O(log n)`. However, it requires the array to be sorted beforehand.

In order to implement the algorithm, we need to keep track of the left and right **boundaries** of the search interval, and repeatedly divide it in half until the element is found or the interval is empty. The boundaries are initialized to `0` and the length of the array, respectively.

Then, using a `while` **loop**, we calculate the **middle index** of the current interval and compare the element at that index with the target element. If the element is **found**, we return the index. Otherwise, we update the boundaries based on the comparison and continue the search.

If the element is **not found** after the loop, we return `-1` to indicate that the element is not present in the array.

```js
const binarySearch = (arr, item) => {
  let l = 0, r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const guess = arr[mid];

    if (guess === item) return mid;
    if (guess > item) r = mid - 1;
    else l = mid + 1;
  }

  return -1;
};

binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1
```

> [!NOTE]
>
> This implementation **does not account for duplicate values** in the array.
