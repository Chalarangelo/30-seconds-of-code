---
title: Index of all matches
tags: array
cover: jars-on-shelf-2
firstSeen: 2018-01-06T12:07:56+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Finds all indexes of `val` in an array.
If `val` never occurs, returns an empty array.

- Use `Array.prototype.reduce()` to loop over elements and store indexes for matching elements.

```js
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
```

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
indexOfAll([1, 2, 3], 4); // []
```
