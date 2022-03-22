---
title: Filter unique array values based on function
tags: array
expertise: intermediate
author: maciv
firstSeen: 2020-11-02T19:41:07+02:00
lastUpdated: 2020-11-02T19:41:07+02:00
---

Creates an array with the unique values filtered out, based on a provided comparator function.

- Use `Array.prototype.filter()` and `Array.prototype.every()` to create an array containing only the non-unique values, based on the comparator function, `fn`.
- The comparator function takes four arguments: the values of the two elements being compared and their indexes.

```js
const filterUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.some((x, j) => (i !== j) === fn(v, x, i, j)));
```

```js
filterUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 3, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 0, value: 'e' } ]
```
