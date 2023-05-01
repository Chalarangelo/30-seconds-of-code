---
title: Array union based on function
type: snippet
tags: [array]
cover: orange-coffee-4
dateModified: 2020-10-22T20:24:44+03:00
---

Returns every element that exists in any of the two arrays at least once, using a provided comparator function.

- Create a `Set` with all values of `a` and values in `b` for which the comparator finds no matches in `a`, using `Array.prototype.findIndex()`.

```js
const unionWith = (a, b, comp) =>
  Array.from(
    new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)])
  );
```

```js
unionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
);
// [1, 1.2, 1.5, 3, 0, 3.9]
```
