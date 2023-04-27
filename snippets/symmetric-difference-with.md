---
title: Array symmetric difference
tags: array
cover: digital-nomad
firstSeen: 2018-01-24T11:59:02+02:00
lastUpdated: 2020-10-18T14:58:09+03:00
---

Returns the symmetric difference between two arrays, using a provided function as a comparator.

- Use `Array.prototype.filter()` and `Array.prototype.findIndex()` to find the appropriate values.

```js
const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];
```

```js
symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]
```
