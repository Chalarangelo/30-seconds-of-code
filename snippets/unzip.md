---
title: Ungroup array elements
tags: array,intermediate
firstSeen: 2018-01-24T12:35:25+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Creates an array of arrays, ungrouping the elements in an array produced by [zip](/js/s/zip).

- Use `Math.max()`, `Function.prototype.apply()` to get the longest subarray in the array, `Array.prototype.map()` to make each element an array.
- Use `Array.prototype.reduce()` and `Array.prototype.forEach()` to map grouped values to individual arrays.

```js
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );
```

```js
unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); // [['a', 'b'], [1, 2], [true]]
```
