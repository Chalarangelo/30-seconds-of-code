---
title: Ungroup array elements
type: snippet
language: javascript
tags: [array]
cover: glass-blowing
dateModified: 2020-10-22
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
