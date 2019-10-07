---
title: powerset
tags: math,beginner
---

Returns the powerset of a given array of numbers.

Use `Array.prototype.reduce()` combined with `Array.prototype.map()` to iterate over elements and combine into an array containing all combinations.

The idea is that every element is either in or not in the smaller powerset. For example, consider the powerset of `[2]`, which is `[[], [2]]`. To find the powerset of `[1, 2]` (which is `[[], [1], [2], [2, 1]]`), notice that we can separate the result into two parts:
1. `[[], [2]]`, which is simply the powerset of `[2]`, and
2. `[[1], [2, 1]]`, which is also the powerset of `[2]`, but with `1` being added to every subset.

```js
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
```

```js
powerset([1, 2]); // [[], [1], [2], [2, 1]]
```