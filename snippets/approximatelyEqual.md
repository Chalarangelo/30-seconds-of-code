---
title: Approximately number equality
tags: math
expertise: beginner
firstSeen: 2018-02-14T12:47:13+02:00
lastUpdated: 2020-11-01T20:50:57+02:00
---

Checks if two numbers are approximately equal to each other.

- Use `Math.abs()` to compare the absolute difference of the two values to `epsilon`.
- Omit the third argument, `epsilon`, to use a default value of `0.001`.

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;
```

```js
approximatelyEqual(Math.PI / 2.0, 1.5708); // true
```
