---
title: Midpoint
type: snippet
language: javascript
tags: [math]
cover: blue-flower
dateModified: 2020-10-21
---

Calculates the midpoint between two pairs of (x,y) points.

- Destructure the array to get `x1`, `y1`, `x2` and `y2`.
- Calculate the midpoint for each dimension by dividing the sum of the two endpoints by `2`.

```js
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
```

```js
midpoint([2, 2], [4, 4]); // [3, 3]
midpoint([4, 4], [6, 6]); // [5, 5]
midpoint([1, 3], [2, 4]); // [1.5, 3.5]
```
