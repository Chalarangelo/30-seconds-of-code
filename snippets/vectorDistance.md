---
title: vectorDistance
tags: math,algorithm,beginner
firstSeen: 2019-02-23T19:13:48+02:00
lastUpdated: 2020-12-28T13:49:24+02:00
---

Calculates the distance between two vectors.

- Use `Array.prototype.reduce()`, `Math.pow()` and `Math.sqrt()` to calculate the Euclidean distance between two vectors.

```js
const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));
```

```js
vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949
```
