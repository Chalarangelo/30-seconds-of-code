---
title: Midpoint of two points
shortTitle: Midpoint
language: javascript
tags: [math]
cover: blue-flower
excerpt: Calculate the midpoint between two pairs of points in a 2D plane, and beyond.
listed: true
dateModified: 2024-05-15
---

Given two points in a **2D plane**, you can calculate the midpoint between them by averaging the x and y coordinates of the two points. This is a simple operation that can be done in a single line of code.

## Midpoint in 2D space

First off, you can use **array destructuring** to extract the x and y coordinates of the two points from the input arrays. Then, you can calculate the midpoint for each dimension by adding the two endpoints and dividing the result by 2.


```js
const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

midpoint([2, 2], [4, 4]); // [3, 3]
midpoint([4, 4], [6, 6]); // [5, 5]
midpoint([1, 3], [2, 4]); // [1.5, 3.5]
```

## Midpoint in 3D space

This operation can be easily to extended to **3D space** by adding a third dimension to the input arrays and the output array.

```js
const midpoint3D = ([x1, y1, z1], [x2, y2, z2]) => [
  (x1 + x2) / 2,
  (y1 + y2) / 2,
  (z1 + z2) / 2,
];

midpoint3D([2, 2, 2], [4, 4, 4]); // [3, 3, 3]
midpoint3D([4, 4, 4], [6, 6, 6]); // [5, 5, 5]
midpoint3D([1, 3, 5], [2, 4, 6]); // [1.5, 3.5, 5.5]
```

## Midpoint in N-dimensional space

In fact, you can extend this operation to **any number of dimensions** by adding more elements to the input arrays and the output array. The formula remains the same, but you will have to use `Array.prototype.map()` to iterate over the coordinates of the two points.

```js
const midpointND = (point1, point2) =>
  point1.map((coord, i) => (coord + point2[i]) / 2);

midpointND([2, 2, 2], [4, 4, 4]); // [3, 3, 3]
midpointND([4, 4, 4, 4], [6, 6, 6, 6]); // [5, 5, 5, 5]
midpointND([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]); // [1.5, 3.5, 5.5, 7.5, 9.5]
```
