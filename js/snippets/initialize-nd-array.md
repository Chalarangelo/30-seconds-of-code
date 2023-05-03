---
title: Initialize n-dimensional array
type: snippet
tags: [array,recursion]
cover: colorful-pots
dateModified: 2020-10-22T20:23:47+03:00
---

Create a n-dimensional array with given value.

- Use recursion.
- Use `Array.from()`, `Array.prototype.map()` to generate rows where each is a new array initialized using `initializeNDArray()`.

```js
const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() =>
        initializeNDArray(val, ...args.slice(1))
      );
```

```js
initializeNDArray(1, 3); // [1, 1, 1]
initializeNDArray(5, 2, 2, 2); // [[[5, 5], [5, 5]], [[5, 5], [5, 5]]]
```
