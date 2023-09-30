---
title: Drop array elements from the left
type: snippet
language: javascript
tags: [array]
cover: salad-2
dateModified: 2020-11-01
---

Creates a new array with `n` elements removed from the left.

- Use `Array.prototype.slice()` to remove the specified number of elements from the left.
- Omit the last argument, `n`, to use a default value of `1`.

```js
const drop = (arr, n = 1) => arr.slice(n);
```

```js
drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```
