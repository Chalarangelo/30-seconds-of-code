---
title: Merge sort
tags: algorithm,array,recursion
expertise: advanced
author: maciv
cover: blog_images/baloons-field.jpg
firstSeen: 2020-12-27T22:44:32+02:00
lastUpdated: 2020-12-27T22:44:32+02:00
---

Sorts an array of numbers, using the merge sort algorithm.

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
```

```js
mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```
