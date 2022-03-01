---
title: Drop list elements from the left
tags: array
expertise: beginner
firstSeen: 2018-01-26T12:23:18+02:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Creates a new array with `n` elements removed from the left.

- Use `Array.prototype.slice()` to remove the specified number of elements from the left.
- Omit the last argument, `n`, to use a default value of `1`.

```js
const drop = (arr, n = 1) => arr.slice(n);
```

```js
drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```
