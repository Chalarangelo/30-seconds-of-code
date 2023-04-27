---
title: Drop list elements from the right based on function
tags: array
cover: bridge-drop
firstSeen: 2018-01-26T12:23:18+02:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Removes elements from the end of an array until the passed function returns `true`.
Returns the remaining elements in the array.

- Loop through the array, using `Array.prototype.slice()` to drop the last element of the array until the value returned from `func` is `true`.
- Return the remaining elements.

```js
const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};
```

```js
dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```
