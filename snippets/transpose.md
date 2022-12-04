---
title: Transpose matrix
tags: array
author: chalarangelo
cover: blog_images/painters-desk.jpg
firstSeen: 2022-04-20T05:00:00-04:00
---

Transposes a two-dimensional array.

- Use `Array.prototype.map()` to create the transpose of the given two-dimensional array.

```js
const transpose = arr => arr[0].map((col, i) => arr.map(row => row[i]));
```

```js
transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
// [[1, 4, 7, 10], [2, 5, 8, 11], [3, 6, 9, 12]
```
