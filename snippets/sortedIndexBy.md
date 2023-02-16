---
title: Insertion index in sorted array based on function
tags: array,math
cover: digital-nomad-15
firstSeen: 2018-01-26T13:39:09+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Finds the lowest index at which a value should be inserted into an array in order to maintain its sorting order, based on the provided iterator function.

- Loosely check if the array is sorted in descending order.
- Use `Array.prototype.findIndex()` to find the appropriate index where the element should be inserted, based on the iterator function `fn`.

```js
const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};
```

```js
sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
```
