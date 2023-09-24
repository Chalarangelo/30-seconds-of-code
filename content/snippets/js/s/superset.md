---
title: Superset of iterable
type: snippet
language: javascript
tags: [array]
cover: waves-from-above-2
dateModified: 2020-10-22
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
