---
title: Consecutive element subarrays
type: snippet
language: javascript
tags: [array]
author: chalarangelo
cover: camera-zoom
dateModified: 2020-10-18
---

Creates an array of `n`-tuples of consecutive elements.

- Use `Array.prototype.slice()` and `Array.prototype.map()` to create an array of appropriate length.
- Populate the array with `n`-tuples of consecutive elements from `arr`.
- If `n` is greater than the length of `arr`, return an empty array.

```js
const aperture = (n, arr) =>
  n > arr.length
    ? []
    : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
```

```js
aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```
