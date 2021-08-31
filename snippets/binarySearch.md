---
title: binarySearch
tags: algorithm,array,beginner
firstSeen: 2020-12-28T12:35:44+02:00
lastUpdated: 2020-12-29T13:06:47+02:00
---

Finds the index of a given element in a sorted array using the binary search algorithm.

- Declare the left and right search boundaries, `l` and `r`, initialized to `0` and the `length` of the array respectively.
- Use a `while` loop to repeatedly narrow down the search subarray, using `Math.floor()` to cut it in half.
- Return the index of the element if found, otherwise return `-1`.
- **Note:** Does not account for duplicate values in the array.

```js
const binarySearch = (arr, item) => {
  let leftIndex = 0,
    r = arr.length - 1;
  while (leftIndex <= rightIndex) {
    const mid = Math.floor((leftIndex + rightIndex) / 2);
    const guess = arr[mid];
    if (guess === item) return mid;
    if (guess > item) rightIndex = mid - 1;
    else leftIndex = mid + 1;
  }
  return -1;
};
```

```js
binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1
```
