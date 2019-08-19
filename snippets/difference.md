---
title: difference
tags: array,math,beginner
---

Returns the difference between two arrays.

Create a `Set` from `b`, then use `Array.prototype.filter()` on `a` to only keep values not contained in `b`.

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
```

```js
difference([1, 2, 3], [1, 2, 4]); // [3]
```