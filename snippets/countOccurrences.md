---
title: countOccurrences
tags: array,intermediate
---

Counts the occurrences of a value in an array.

Use `Array.prototype.reduce()` to increment a counter each time you encounter the specific value inside the array.

```js
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
```

```js
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```