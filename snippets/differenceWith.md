---
title: Array difference based on function
tags: array
expertise: intermediate
cover: blog_images/folded-map.jpg
firstSeen: 2017-12-19T12:32:24+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Filters out all values from an array for which the comparator function does not return `true`.

- Use `Array.prototype.filter()` and `Array.prototype.findIndex()` to find the appropriate values.
- Omit the last argument, `comp`, to use a default strict equality comparator.

```js
const differenceWith = (arr, val, comp = (a, b) => a === b) =>
  arr.filter(a => val.findIndex(b => comp(a, b)) === -1);
```

```js
differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2]
differenceWith([1, 1.2, 1.3], [1, 1.3, 1.5]); // [1.2]
```
