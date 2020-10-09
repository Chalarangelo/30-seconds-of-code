---
title: flatten
tags: array,intermediate
---

Flattens an array up to the specified depth.

- Use `Array.prototype.flat`.

```js
const flatten = (arr, depth = 1) => arr.flat;
```

```js
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```
