---
title: hasDuplicates
tags: array,beginner
firstSeen: 2020-10-22T20:23:09+03:00
lastUpdated: 2020-10-22T20:23:09+03:00
---

Checks if there are duplicate values in a flat array.

- Use `Set` to get the unique values in the array.
- Use `Set.prototype.size` and `Array.prototype.length` to check if the count of the unique values is the same as elements in the original array.

```js
const hasDuplicates = arr => new Set(arr).size !== arr.length;
```

```js
hasDuplicates([0, 1, 1, 2]); // true
hasDuplicates([0, 1, 2, 3]); // false
```
