---
title: Remove list elements from the end
tags: array,intermediate
firstSeen: 2017-12-15T02:00:10+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Creates an array with `n` elements removed from the end.

- Use `Array.prototype.slice()` to create a slice of the array with `n` elements taken from the end.

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
```

```js
takeRight([1, 2, 3], 2); // [ 2, 3 ]
takeRight([1, 2, 3]); // [3]
```
