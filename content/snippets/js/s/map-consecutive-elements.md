---
title: Map consecutive elements
type: snippet
language: javascript
tags: [array]
author: chalarangelo
cover: cold-mountains
dateModified: 2021-08-08
---

Maps each block of `n` consecutive elements using the given function, `fn`.

- Use `Array.prototype.slice()` to get `arr` with `n` elements removed from the left.
- Use `Array.prototype.map()` and `Array.prototype.slice()` to apply `fn` to each block of `n` consecutive elements in `arr`.

```js
const mapConsecutive = (arr, n, fn) =>
  arr.slice(n - 1).map((v, i) => fn(arr.slice(i, i + n)));
```

```js
mapConsecutive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, x => x.join('-'));
// ['1-2-3', '2-3-4', '3-4-5', '4-5-6', '5-6-7', '6-7-8', '7-8-9', '8-9-10'];
```
