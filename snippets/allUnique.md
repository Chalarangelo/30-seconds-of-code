---
title: Check if all array elements are unique
tags: array
expertise: beginner
firstSeen: 2020-10-19T19:47:26+03:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Checks if all elements in an array are unique.

- Create a new `Set` from the mapped values to keep only unique occurrences.
- Use `Array.prototype.length` and `Set.prototype.size` to compare the length of the unique values to the original array.

```js
const allUnique = arr => arr.length === new Set(arr).size;
```

```js
allUnique([1, 2, 3, 4]); // true
allUnique([1, 1, 2, 3]); // false
```
