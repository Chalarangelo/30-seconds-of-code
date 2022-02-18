---
title: Value frequencies
tags: array,object,intermediate
firstSeen: 2020-01-03T15:32:35+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Creates an object with the unique values of an array as keys and their frequencies as the values.

- Use `Array.prototype.reduce()` to map unique values to an object's keys, adding to existing keys every time the same value is encountered.

```js
const frequencies = arr =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});
```

```js
frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // { a: 4, b: 2, c: 1 }
frequencies([...'ball']); // { b: 1, a: 1, l: 2 }
```
