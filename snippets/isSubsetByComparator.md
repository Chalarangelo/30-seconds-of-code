---
title: isSubsetByComparator
tags: array,intermediate
---

Determines whether the first given array is a subset of the second given array based on the output
of a comparator function.

- Uses `Array.protoype.every()` to iterate over every element of arrA
- Uses `Array.prototype.some()` to greedily match elements inside arrA to those in arrB
- Uses a `comparator()` function to determine what exactly a match is

```js
const isSubsetByComparator = (comparator, arrA, arrB) => arrA.every(a => arrB.some(b => comparator(a, b)));
```

```js
isSubsetByComparator((x, y) => x === y, [1, 2, 3], [3, 2, 1]); // 'true'
isSubsetByComparator((x, y) => x * 2 === y, [1, 3, 5], [2, 4, 6, 8, 10]); // 'true'
```
