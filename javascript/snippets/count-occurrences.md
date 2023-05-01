---
title: Count occurrences
type: snippet
tags: [array]
cover: dark-leaves-4
dateModified: 2020-10-18T23:04:45+03:00
---

Counts the occurrences of a value in an array.

- Use `Array.prototype.reduce()` to increment a counter each time the specific value is encountered inside the array.

```js
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
```

```js
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```
