---
title: Disjointed iterables
type: snippet
language: javascript
tags: [array]
cover: interior-9
dateModified: 2020-10-11
---

Checks if the two iterables are disjointed (have no common values).

- Use the `Set` constructor to create a new `Set` object from each iterable.
- Use `Array.prototype.every()` and `Set.prototype.has()` to check that the two iterables have no common values.

```js
const isDisjoint = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sA].every(v => !sB.has(v));
};
```

```js
isDisjoint(new Set([1, 2]), new Set([3, 4])); // true
isDisjoint(new Set([1, 2]), new Set([1, 3])); // false
```
