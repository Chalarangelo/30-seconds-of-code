---
title: Last n elements
tags: array
author: chalarangelo
cover: interior-5
firstSeen: 2022-07-23T05:00:00-04:00
---

Gets the last `n` elements of an array.

- Use `Array.prototype.slice()` with a start value of `-n` to get the last `n` elements of `arr`.

```js
const lastN = (arr, n) => arr.slice(-n);
```

```js
lastN(['a', 'b', 'c', 'd'], 2); // ['c', 'd']
```
