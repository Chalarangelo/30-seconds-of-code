---
title: hasDuplicates
tags: array,beginner
---

Checks if there are duplicate values in a flat array.

- Use `Set()` to get the unique values in the array.
- Use `Set.prototype.size` and `Array.prototype.length` to check if the count of the unique values is the same as elements in the original array.

```js
const hasDuplicates = arr => new Set(arr).size !== arr.length;
```

```js
hasDuplicates([0,1,1,2]); // true
hasDuplicates([0,1,2,3,]); // false
```
