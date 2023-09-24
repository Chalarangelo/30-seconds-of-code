---
title: Drop array elements from the left based on function
type: snippet
language: javascript
tags: [array]
cover: metropolitan-window
dateModified: 2020-10-19
---

Removes elements in an array until the passed function returns `true`.
Returns the remaining elements in the array.

- Loop through the array, using `Array.prototype.slice()` to drop the first element of the array until the value returned from `func` is `true`.
- Return the remaining elements.

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
```

```js
dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]
```
