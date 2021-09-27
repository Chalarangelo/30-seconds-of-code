---
title: powerset
tags: math,algorithm,beginner
firstSeen: 2017-12-07T14:41:33+02:00
lastUpdated: 2021-09-27T15:27:07+02:00
---

Returns the powerset of a given array of numbers.

- Use `Array.prototype.reduce()` combined with `Array.prototype.map()` to iterate over elements and combine into an array containing all combinations.

```js
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => r.concat(v))), [[]]);
```

```js
powerset([1, 2]); // [[], [1], [2], [1, 2]]
```
