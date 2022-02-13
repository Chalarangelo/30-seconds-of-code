---
title: Insertion index in sorted array
tags: array,math,intermediate
firstSeen: 2017-12-31T16:39:06+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Finds the lowest index at which a value should be inserted into an array in order to maintain its sorting order.

- Loosely check if the array is sorted in descending order.
- Use `Array.prototype.findIndex()` to find the appropriate index where the element should be inserted.

```js
const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};
```

```js
sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1
```
