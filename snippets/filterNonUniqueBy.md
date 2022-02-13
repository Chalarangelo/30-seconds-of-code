---
title: Filter non-unique array values based on function
tags: array,intermediate
firstSeen: 2018-07-18T20:40:53+03:00
lastUpdated: 2020-11-02T19:40:27+02:00
---

Creates an array with the non-unique values filtered out, based on a provided comparator function.

- Use `Array.prototype.filter()` and `Array.prototype.every()` to create an array containing only the unique values, based on the comparator function, `fn`.
- The comparator function takes four arguments: the values of the two elements being compared and their indexes.

```js
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
```

```js
filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id === b.id
); // [ { id: 2, value: 'c' } ]
```
