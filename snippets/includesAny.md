---
title: Check if array includes any values
tags: array,beginner
firstSeen: 2019-11-03T23:49:17+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if at least one element of `values` is included in `arr`.

- Use `Array.prototype.some()` and `Array.prototype.includes()` to check if at least one element of `values` is included in `arr`.

```js
const includesAny = (arr, values) => values.some(v => arr.includes(v));
```

```js
includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false
```
