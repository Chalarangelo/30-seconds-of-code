---
title: unionBy
tags: array,function,intermediate
---

Returns every element that exists in any of the two arrays once, after applying the provided function to each array element of both.

Create a `Set` by applying all `fn` to all values of `a`.
Create a `Set` from `a` and all elements in `b` whose value, after applying `fn` does not match a value in the previously created set.
Return the last set converted to an array.

```js
const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};
```

```js
unionBy([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id) // [{ id: 1 }, { id: 2 }, { id: 3 }]
```
