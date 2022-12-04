---
title: Arrays of consecutive elements
tags: array
author: chalarangelo
cover: blog_images/colorful-pots.jpg
firstSeen: 2022-04-06T05:00:00-04:00
---

Finds all arrays of consecutive elements.

- Use `Array.prototype.slice()` to create an array with `n - 1` elements removed from the start.
- Use `Array.prototype.map()` and `Array.prototype.slice()` to map each element to an array of `n` consecutive elements.

```js
const findConsecutive = (arr, n) =>
  arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
```

```js
findConsecutive([1, 2, 3, 4, 5], 2);
// [[1, 2], [2, 3], [3, 4], [4, 5]]
```
