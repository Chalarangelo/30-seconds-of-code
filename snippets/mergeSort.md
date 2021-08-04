---
title: mergeSort
tags: algorithm,array,recursion,advanced
firstSeen: 2020-12-27T22:44:32+02:00
lastUpdated: 2020-12-27T22:44:32+02:00
---

Sorts an array of numbers, using the merge sort algorithm.

- Use recursion.
- Check arguments for negative values.
- If the `length` of the array is less than `2`, return the copy of the array using `Array.prototype.slice()`.
- Use bitwise operator to calculate the middle point of the array.
- Use the recursive call of `mergeSort()` to get two sorted halves of the array.
- Сombine the halves into one sorted array.
- Copy the remaining elements of the first half if there are any.
- Copy the remaining elements of the second half if there are any.
- Omit the second argument `start` to sort the elements from the beginning of the array up to, but not including, the element at index `end`.
- Omit the third argument `end` to sort the elements from index `start` to the end of the array.
- Omit both arguments (`start`, `end`) to sort all the elements in the array.

```js
const mergeSort = (arr, start = 0, end = arr.length) => {
  if (start < 0) start = 0;
  if (end < 0) end = 0;
  if (end - start < 2) return arr.slice(start, end);
  const mid = (start + end) >> 1;
  const left = mergeSort(arr, start, mid);
  const right = mergeSort(arr, mid, end);
  const result = [];
  let l = 0, r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] > right[r]) result.push(right[r++]);
    else result.push(left[l++]);
  }
  while (l < left.length) result.push(left[l++]);
  while (r < right.length) result.push(right[r++]);
  return result;
};
```

```js
mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```
