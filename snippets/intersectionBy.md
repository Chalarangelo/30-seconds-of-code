---
title: Array intersection based on function
tags: array
cover: cobbled-street
firstSeen: 2018-01-24T12:53:18+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Returns the elements that exist in both arrays, after applying the provided function to each array element of both.

- Create a `Set` by applying `fn` to all elements in `b`.
- Use `Array.prototype.filter()` on `a` to only keep elements, which produce values contained in `b` when `fn` is applied to them.

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return [...new Set(a)].filter(x => s.has(fn(x)));
};
```

```js
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
intersectionBy(
  [{ title: 'Apple' }, { title: 'Orange' }],
  [{ title: 'Orange' }, { title: 'Melon' }],
  x => x.title
); // [{ title: 'Orange' }]
```
