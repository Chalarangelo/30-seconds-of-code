---
title: bucketSort
tags: algorithm,array,intermediate
firstSeen: 2020-12-28T22:11:56+02:00
lastUpdated: 2020-12-29T12:22:44+02:00
---

Sorts an array of numbers, using the bucket sort algorithm.

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
```

```js
bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```
