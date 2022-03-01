---
title: Count occurrences
tags: array
expertise: intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-18T23:04:45+03:00
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
