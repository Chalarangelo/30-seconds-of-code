---
title: Array is contained in other array
tags: array
expertise: intermediate
firstSeen: 2020-01-05T21:40:51+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Checks if the elements of the first array are contained in the second one regardless of order.

- Use a `for...of` loop over a `Set` created from the first array.
- Use `Array.prototype.some()` to check if all distinct values are contained in the second array.
- Use `Array.prototype.filter()` to compare the number of occurrences of each distinct value in both arrays.
- Return `false` if the count of any element is greater in the first array than the second one, `true` otherwise.

```js
const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};
```

```js
isContainedIn([1, 4], [2, 4, 1]); // true
```
