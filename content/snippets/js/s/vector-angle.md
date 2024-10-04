---
title: Calculate the angle between two vectors in JavaScript
shortTitle: Vector angle
language: javascript
tags: [math]
cover: purple-pier
excerpt: Learn how to calculate the angle (theta) between two vectors in JavaScript.
listed: true
dateModified: 2024-05-16
---

Given two vectors, you can calculate the angle between them using a few simple math operations. All you need to do is calculate the magnitude of each vector, the scalar product of the two vectors and use the arccosine function to get the **theta** value.

Simply put, you can use `Math.hyptot()` to calculate the **magnitude** of each vector, then multiply the corresponding elements of the two vectors and sum them up. Then, use `Array.prototype.reduce()` to calculate the **scalar product** of the two vectors. Finally, divide the scalar product by the product of the magnitudes of the two vectors and pass the result to `Math.acos()` to get the **angle in radians**.

```js
const vectorAngle = (x, y) =>
  Math.acos(
    x.reduce((acc, n, i) => acc + n * y[i], 0) /
      (Math.hypot(...x) * Math.hypot(...y))
  );

vectorAngle([3, 4], [4, 3]); // 0.283794109208328
```
