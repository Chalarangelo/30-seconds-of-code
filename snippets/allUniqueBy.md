---
title: allUniqueBy
tags: array,intermediate
---

Checks if all elements in an array are unique, based on the provided mapping function.

- Use `Array.prototype.map()` to apply `fn` to all elements in `arr`.
- Create a new `Set` from the mapped values to keep only unique occurences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique mapped values to the original array.

```js
const allUniqueBy = (arr, fn) => arr.length === new Set(arr.map(fn)).size;
```

```js
allUniqueBy([1.2, 2.4, 2.9], Math.round); // true
allUniqueBy([1.2, 2.3, 2.4], Math.round); // false
```
