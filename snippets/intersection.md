---
title: Array intersection
tags: array
cover: red-berries
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Returns the elements that exist in both arrays, filtering duplicate values.

- Create a `Set` from `b`, then use `Array.prototype.filter()` on `a` to only keep values contained in `b`.

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};
```

```js
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```
