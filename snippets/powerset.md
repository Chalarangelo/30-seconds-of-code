---
title: powerset
tags: math,beginner
---

Returns the powerset of a given array of numbers.

- Use `Array.prototype.reduce()` combined with `Array.prototype.map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
```

```js
powerset([1, 2]); // [[], [1], [2], [2, 1]]
```
