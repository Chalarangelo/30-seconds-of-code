---
title: Arithmetic and geometric progression in JavaScript
shortTitle: Arithmetic and geometric progression
language: javascript
tags: [math,algorithm]
cover: half-trees
excerpt: Create arrays of numbers in arithmetic and geometric progression.
listed: true
dateModified: 2024-02-16
---

Arithmetic progression refers to a sequence of numbers in which the **difference** between any two successive members is a constant. Geometric progression refers to a sequence of numbers in which the **ratio** between any two successive members is a constant. Both can be easily implemented in JavaScript.

## Arithmetic progression

Given a positive integer `n` and a positive limit `lim`, the task is to create an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.

In order to do so, you can use `Array.from()` to create an array of the desired length, `lim / n`. Then, use a map function as the second argument to fill it with the desired values in the given range.

```js
const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]
```

## Geometric progression

Given a positive integer `end`, and optional positive integers `start` and `step`, the task is to create an array of numbers in the geometric progression, starting with the given positive integer and up to the specified limit.

In order to do so, you can use `Array.from()`, `Math.log()` and `Math.floor()` to create an array of the desired length. Then, use `Array.prototype.map()` to fill it with the desired values in the given range. Omit the second argument, `start`, to use a default value of `1`. Omit the third argument, `step`, to use a default value of `2`.

```js
const geometricProgression = (end, start = 1, step = 2) =>
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
  }).map((_, i) => start * step ** i);

geometricProgression(256); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
geometricProgression(256, 3); // [3, 6, 12, 24, 48, 96, 192]
geometricProgression(256, 1, 4); // [1, 4, 16, 64, 256]
```
