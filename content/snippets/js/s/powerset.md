---
title: Powerset
type: snippet
language: javascript
tags: [math,algorithm]
cover: new-plant
dateModified: 2021-09-27
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
