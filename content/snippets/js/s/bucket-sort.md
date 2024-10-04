---
title: Bucket sort
language: javascript
tags: [algorithm,array]
cover: canoe
excerpt: Sort an array of numbers, using the bucket sort algorithm.
listed: true
dateModified: 2023-12-16
---


## Implementation

- Use `Math.min()`, `Math.max()` and the spread operator (`...`) to find the minimum and maximum values of the given array.
- Use `Array.from()` and `Math.floor()` to create the appropriate number of `buckets` (empty arrays).
- Use `Array.prototype.forEach()` to populate each bucket with the appropriate elements from the array.
- Use `Array.prototype.reduce()`, the spread operator (`...`) and `Array.prototype.sort()` to sort each bucket and append it to the result.

```js
const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

## Complexity

The algorithm has an [average time complexity](/js/s/big-o-cheatsheet#array-sorting-algorithms) of `O(n + k)`, where `n` is the size of the input array and `k` is the number of buckets.
