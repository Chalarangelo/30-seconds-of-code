---
title: Mapped array intersection
type: snippet
language: javascript
tags: [array]
cover: cobbled-street
dateModified: 2020-10-20
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
