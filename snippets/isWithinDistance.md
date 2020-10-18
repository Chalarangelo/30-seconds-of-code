---
title: isWithinDistance
tags: math,beginner
---

Checks whether two points are within the given Euclidean distance.

- Uses basic math to calculate the square of the Euclidean distance between two points which is then compared to the given distance.
- Avoids using slow square root functions like Math.hypot().

```js
const isWithinDistance = (x0, y0, x1, y1, distance) => distance * distance <= (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
```

```js
isWithinDistance(0, 0, 4, 4, 6); // false
isWithinDistance(3, 5, 8, 12, 8); // true
```
