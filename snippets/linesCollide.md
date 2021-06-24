---
title: linesCollide
tags: array,intermediate
firstSeen: 2021-06-24T18:37:03.030Z
---

Detects if two lines collide.

- Essentially slides a point along one line, along the way testing if that point is on the other line.
- Useful for games, complex collisions, physics simulations, and more!

```js
const linesCollide = (point1, point2) => {
  var {x1:a, y1: b, x2: c, y2: d} = point1;
  var {x1:p, y1: q, x2: r, y2: s} = point2;
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}
```

```js
linesCollide({ x1: 0, y1: 0, x2: 100, y2: 100}, {x1: 100, y1: 0, x2: 0, y2: 100}); // true
```
