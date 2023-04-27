---
title: Vector angle
tags: math
cover: avocado-slices
firstSeen: 2019-12-16T16:43:13+02:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Calculates the angle (theta) between two vectors.

- Use `Array.prototype.reduce()`, `Math.pow()` and `Math.sqrt()` to calculate the magnitude of each vector and the scalar product of the two vectors.
- Use `Math.acos()` to calculate the arccosine and get the theta value.

```js
const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};
```

```js
vectorAngle([3, 4], [4, 3]); // 0.283794109208328
```
