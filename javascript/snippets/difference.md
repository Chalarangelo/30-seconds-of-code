---
title: Array difference
type: snippet
tags: [array]
cover: interior-3
dateModified: 2020-10-19T18:51:03+03:00
---

Calculates the difference between two arrays, without filtering duplicate values.

- Create a `Set` from `b` to get the unique values in `b`.
- Use `Array.prototype.filter()` on `a` to only keep values not contained in `b`, using `Set.prototype.has()`.

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
```

```js
difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]
```
