---
title: allEqualBy
tags: array,intermediate
firstSeen: 2020-10-19T22:14:49+03:00
lastUpdated: 2020-10-19T22:14:49+03:00
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
