---
title: Cartesian product
type: snippet
language: javascript
tags: [math]
cover: sail-away
dateModified: 2020-12-29
---

Calculates the cartesian product of two arrays.

- Use `Array.prototype.reduce()`, `Array.prototype.map()` and the spread operator (`...`) to generate all possible element pairs from the two arrays.

```js
const cartesianProduct = (a, b) =>
  a.reduce((p, x) => [...p, ...b.map(y => [x, y])], []);
```

```js
cartesianProduct(['x', 'y'], [1, 2]);
// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]
```
