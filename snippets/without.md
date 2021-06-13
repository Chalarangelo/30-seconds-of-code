---
title: without
tags: array,beginner
firstSeen: 2017-12-15T09:35:30+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Filters out the elements of an array that have one of the specified values.

- Use `Array.prototype.includes()` to find values to exclude.
- Use `Array.prototype.filter()` to create an array excluding them.

```js
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
```

```js
without([2, 1, 2, 3], 1, 2); // [3]
```
