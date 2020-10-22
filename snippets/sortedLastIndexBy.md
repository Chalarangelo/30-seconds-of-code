---
title: sortedLastIndexBy
tags: array,intermediate
---

Finds the highest index at which a value should be inserted into an array in order to maintain its sort order, based on a provided iterator function.

- Loosely check if the array is sorted in descending order.
- Use `Array.prototype.map()` to apply the iterator function to all elements of the array.
- Use `Array.prototype.reverse()` and `Array.prototype.findIndex()` to find the appropriate last index where the element should be inserted, based on the provided iterator function.

```js
const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};
```

```js
sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1
```
