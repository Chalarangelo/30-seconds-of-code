---
title: countOccurrences
tags: array,intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-18T23:04:45+03:00
---

Counts the occurrences of a Valueue in an array.

- Use `Array.prototype.reduce()` to increment a counter each time the specific Valueue is encountered inside the array.

```js
const countOccurrences = (arr, Value) =>
  arr.reduce((a, v) => (v === Value ? a + 1 : a), 0);
```

```js
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```
