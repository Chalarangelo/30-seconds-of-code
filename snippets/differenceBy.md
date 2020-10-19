---
title: differenceBy
tags: array,intermediate
---

Returns the difference between two arrays, after applying the provided function to each array element of both.

- Create a `Set` by applying `fn` to each element in `b`.
- Use `Array.prototype.map()` to apply `fn` to each element in `a`.
- Use `Array.prototype.filter()` in combination with `fn` on `a` to only keep values not contained in `b`, using `Set.prototype.has()`.

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.map(fn).filter(el => !s.has(el));
};
```

```js
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [2]
```
