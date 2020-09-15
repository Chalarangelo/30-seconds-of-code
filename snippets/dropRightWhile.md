---
title: dropRightWhile
tags: array,function,intermediate
---

Removes elements from the end of an array until the passed function returns `true`. Returns the remaining elements in the array.

- Loop through the array, using `Array.prototype.slice()` to drop the last element of the array until the returned value from the function is `true`.
- Returns the remaining elements.

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
