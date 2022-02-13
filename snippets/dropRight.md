---
title: Drop list elements from the right
tags: array,beginner
firstSeen: 2017-12-19T12:06:47+02:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Creates a new array with `n` elements removed from the right.

- Use `Array.prototype.slice()` to remove the specified number of elements from the right.
- Omit the last argument, `n`, to use a default value of `1`.

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);
```

```js
dropRight([1, 2, 3]); // [1, 2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
```
