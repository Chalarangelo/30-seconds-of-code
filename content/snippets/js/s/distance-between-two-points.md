---
title: Distance between two points
type: snippet
language: javascript
tags: [math,algorithm]
cover: measuring
dateModified: 2020-12-28
---

Calculates the distance between two points.

- Use `Math.hypot()` to calculate the Euclidean distance between two points.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

```js
distance(1, 1, 2, 3); // ~2.2361
```
