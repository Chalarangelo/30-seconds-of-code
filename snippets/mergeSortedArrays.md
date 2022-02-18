---
title: Merge sorted arrays
tags: array,intermediate
firstSeen: 2020-12-27T22:55:37+02:00
lastUpdated: 2020-12-27T22:55:37+02:00
---

Merges two sorted arrays into one.

- Use the spread operator (`...`) to clone both of the given arrays.
- Use `Array.from()` to create an array of the appropriate length based on the given arrays.
- Use `Array.prototype.shift()` to populate the newly created array from the removed elements of the cloned arrays.

```js
const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};
```

```js
mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]
```
