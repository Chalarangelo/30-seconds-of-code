---
title: Array intersection based on function
tags: array
cover: blog_images/digital-nomad-2.jpg
firstSeen: 2018-01-24T12:53:18+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Returns the elements that exist in both arrays, using a provided comparator function.

- Use `Array.prototype.filter()` and `Array.prototype.findIndex()` in combination with the provided comparator to determine intersecting values.

```js
const intersectionWith = (a, b, comp) =>
  a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
```

```js
intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1.5, 3, 0]
```
