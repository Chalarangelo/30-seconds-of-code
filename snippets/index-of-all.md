---
title: Index of all matches
type: snippet
tags: [array]
cover: jars-on-shelf-2
dateModified: 2020-10-22T20:23:47+03:00
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
