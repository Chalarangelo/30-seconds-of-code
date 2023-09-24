---
title: Check if array elements are equal based on function
type: snippet
language: javascript
tags: [array]
cover: orange-coffee-2
dateModified: 2020-10-19
---

Checks if all elements in an array are equal, based on the provided mapping function.

- Apply `fn` to the first element of `arr`.
- Use `Array.prototype.every()` to check if `fn` returns the same value for all elements in the array as it did for the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqualBy = (arr, fn) => {
  const eql = fn(arr[0]);
  return arr.every(val => fn(val) === eql);
};
```

```js
allEqualBy([1.1, 1.2, 1.3], Math.round); // true
allEqualBy([1.1, 1.3, 1.6], Math.round); // false
```
