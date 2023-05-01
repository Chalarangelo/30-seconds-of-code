---
title: Last insertion index in sorted array
type: snippet
tags: [array]
cover: rocky-beach-3
dateModified: 2020-10-22T20:24:30+03:00
---

Finds the highest index at which a value should be inserted into an array in order to maintain its sort order.

- Loosely check if the array is sorted in descending order.
- Use `Array.prototype.reverse()` and `Array.prototype.findIndex()` to find the appropriate last index where the element should be inserted.

```js
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};
```

```js
sortedLastIndex([10, 20, 30, 30, 40], 30); // 4
```
