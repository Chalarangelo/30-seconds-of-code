---
title: Superset of iterable
tags: array
expertise: intermediate
author: maciv
firstSeen: 2020-10-11T11:53:19+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Checks if the first iterable is a superset of the second one, excluding duplicate values.

- Use the `Set` constructor to create a new `Set` object from each iterable.
- Use `Array.prototype.every()` and `Set.prototype.has()` to check that each value in the second iterable is contained in the first one.

```js
const superSet = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sB].every(v => sA.has(v));
};
```

```js
superSet(new Set([1, 2, 3, 4]), new Set([1, 2])); // true
superSet(new Set([1, 2, 3, 4]), new Set([1, 5])); // false
```
