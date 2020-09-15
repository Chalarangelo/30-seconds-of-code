---
title: vectorDistance
tags: math,beginner
---

Returns the distance between two vectors.

- Use `Array.prototype.reduce()`, `Math.pow()` and `Math.sqrt()` to calculate the Euclidean distance between two vectors.

```js
const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));
```

```js
vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949
```
