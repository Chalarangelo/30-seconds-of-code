---
title: isContainedIn
tags: array,intermediate
---

Returns `true` if the elements of the first array are contained in the second one regardless of order, `false` otherwise.

- Use a `for...of` loop over a `Set` created from the first array.
- Use `Array.prototype.some()` to check if all distinct values are contained in the second array, use `Array.prototype.filter()` to compare the number of occurrences of each distinct value in both arrays.
- Return `false` if the count of any element is greater in the first array than the second one, `true` otherwise.

```js
const isContainedIn = (a, b) => {
  const hashMap = {};

  b.forEach((item, index) => {
    hashMap[item] = index;
  });

  return a.every((item) => {
    return hashMap[item] !== undefined;
  });
};
```

```js
isContainedIn([1, 5], [2, 4, 1]); // false
isContainedIn([], []); // true
isContainedIn([], [3, 5]); // true
isContainedIn([1, 4], [2, 4, 1]); // true
```
