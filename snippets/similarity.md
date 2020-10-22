---
title: similarity
tags: array,math,beginner
---

Returns an array of elements that appear in both arrays.

- Use `Array.prototype.includes()` to determine values that are not part of `values`.
- Use `Array.prototype.filter()` to remove them.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
```

```js
similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
```
