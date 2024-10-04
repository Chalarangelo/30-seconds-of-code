---
title: Check if two numbers are approximately equal in JavaScript
shortTitle: Approximate number equality
language: javascript
tags: [math]
cover: female-hiker
excerpt: Learn how to check if two numbers are approximately equal to each other in JavaScript.
listed: true
dateModified: 2024-02-04
---

We've all seen the classic **floating point arithmetic** problem in JavaScript, usually demonstrated as `0.1 + 0.2 === 0.3` returning `false`. This is due to the **limited precision** of floating point numbers, and is a common problem in many programming languages.

In many cases, not limited to precision issues, you might want to check if two numbers are approximately equal to each other. Generally speaking, the straightforward way to do this is to use `Math.abs()` to compare the **absolute difference** of the two numbers to a certain `epsilon` value.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

approximatelyEqual(0.1 + 0.2, 0.3); // true
approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```
