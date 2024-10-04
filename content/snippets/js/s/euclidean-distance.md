---
title: Calculate the Euclidean distance in JavaScript
language: javascript
tags: [math,algorithm]
cover: ancient-greek-building
excerpt: Use JavaScript's `Math.hypot()` to calculate the Euclidean distance between two points.
listed: true
dateModified: 2023-12-18
---

## Definition

The [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between two points is the **length of the line segment connecting them**. The formula for calculating it in 2D is equal to the **hypotenuse** of a right triangle, given by the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).

## Implementation

JavaScript's `Math.hypot()` method can be used to calculate the Euclidean distance between two points in **2 dimensions**.

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

distance(1, 1, 2, 3); // ~2.2361
```

In **3 dimensions**, the formula is the same, but with an additional dimension. For readability's sake, we should also use represent **each point as an array**.

```js
const distance = ([x0, y0, z0], [x1, y1, z1]) =>
  Math.hypot(x1 - x0, y1 - y0, z1 - z0);

distance([1, 1, 1], [2, 3, 2]); // ~2.4495
```

In fact, for **any number of dimensions**, we can use the same formula. Using `Object.keys()` and `Array.prototype.map()`, we can map each coordinate to its difference between the two points. Then, using the spread operator (`...`), we can pass the resulting values to `Math.hypot()`.

```js
const euclideanDistance = (a, b) =>
  Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

euclideanDistance([1, 1], [2, 3]); // ~2.2361
euclideanDistance([1, 1, 1], [2, 3, 2]); // ~2.4495
euclideanDistance([1, 1, 1, 1], [2, 3, 2, 3]); // ~3.1623
```

## Complexity

The **time complexity** of the algorithmic implementation is `O(n)`, where `n` is the number of dimensions, due to the complexity of `Array.prototype.map()`.
