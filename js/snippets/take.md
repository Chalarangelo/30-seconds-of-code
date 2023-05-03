---
title: Remove list elements
type: snippet
tags: [array]
cover: interior-9
dateModified: 2020-10-22T20:24:30+03:00
---

Creates an array with `n` elements removed from the beginning.

- Use `Array.prototype.slice()` to create a slice of the array with `n` elements taken from the beginning.

```js
const take = (arr, n = 1) => arr.slice(0, n);
```

```js
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []
```
