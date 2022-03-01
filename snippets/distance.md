---
title: Distance between two points
tags: math,algorithm
expertise: beginner
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-12-28T13:49:24+02:00
---

Calculates the distance between two points.

- Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

```js
distance(1, 1, 2, 3); // ~2.2361
```
