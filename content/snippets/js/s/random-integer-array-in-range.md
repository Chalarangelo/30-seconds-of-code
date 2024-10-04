---
title: Generate a JavaScript array of random integers in a given range
shortTitle: Random integer array in range
language: javascript
tags: [math,random]
cover: digital-nomad-11
excerpt: Combining `Math.random()` and a few simple math operations, you can generate an array of random integers in a specified range.
listed: true
dateModified: 2024-03-15
---

We've previously covered how to [generate a random integer or number in a given range](/js/s/random-number-or-integer-in-range). But how about generating an entire array of integers in a specified range?

As you might expect, this is just a matter of **repeating the process** for generating an integer in the given range. You can use `Array.from()` to create an **empty array of the specific length** and then use `Math.random()` to generate **random numbers** and map them to the desired range, using `Math.floor()` to make them integers.

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
```
