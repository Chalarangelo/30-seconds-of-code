---
title: symmetricDifferenceBy
tags: array,intermediate
firstSeen: 2018-01-24T11:59:02+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.

- Create a `Set` from each array to get the unique values of each one after applying `fn` to them.
- Use `Array.prototype.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};
```

```js
symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
symmetricDifferenceBy(
  [{ id: 1 }, { id: 2 }, { id: 3 }],
  [{ id: 1 }, { id: 2 }, { id: 4 }],
  i => i.id
);
// [{ id: 3 }, { id: 4 }]
```
