---
title: randomIntArrayInRange
tags: math,random,intermediate
firstSeen: 2018-01-15T13:25:18+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Generates an array of `n` random integers in the specified range.

- Use `Array.from()` to create an empty array of the specific length.
- Use `Math.random()` to generate random numbers and map them to the desired range, using `Math.floor()` to make them integers.

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
```

```js
randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
```
