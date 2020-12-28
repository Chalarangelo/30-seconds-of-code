---
title: distance
tags: math,algorithm,beginner
---

Calculates the distance between two points.

- Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

```js
distance(1, 1, 2, 3); // ~2.2361
```
