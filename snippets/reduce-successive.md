---
title: Array of successive values
type: snippet
tags: [array]
cover: laptop-view
dateModified: 2020-10-22T20:24:04+03:00
---

Applies a function against an accumulator and each element in the array (from left to right), returning an array of successively reduced values.

- Use `Array.prototype.reduce()` to apply the given function to the given array, storing each new result.

```js
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce(
    (res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res),
    [acc]
  );
```

```js
reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0);
// [0, 1, 3, 6, 10, 15, 21]
```
