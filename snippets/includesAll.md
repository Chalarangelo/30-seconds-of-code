---
title: Check if array includes all values
tags: array
cover: blog_images/tomatoes.jpg
firstSeen: 2019-11-04T21:37:16+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if all the elements in `values` are included in `arr`.

- Use `Array.prototype.every()` and `Array.prototype.includes()` to check if all elements of `values` are included in `arr`.

```js
const includesAll = (arr, values) => values.every(v => arr.includes(v));
```

```js
includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false
```
