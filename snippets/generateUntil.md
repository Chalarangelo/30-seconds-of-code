---
title: Generate until condition is met
tags: function,generator
author: chalarangelo
cover: type-stamps
firstSeen: 2022-01-21T05:00:00-04:00
---

Creates a generator, that keeps producing new values until the given condition is met.

- Initialize the current `val` using the `seed` value.
- Use a `while` loop to iterate while the `condition` function called with the current `val` returns `false`.
- Use `yield` to return the current `val` and optionally receive a new seed value, `nextSeed`.
- Use the `next` function to calculate the next value from the current `val` and the `nextSeed`.

```js
const generateUntil = function* (seed, condition, next) {
  let val = seed;
  let nextSeed = null;
  while (!condition(val)) {
    nextSeed = yield val;
    val = next(val, nextSeed);
  }
  return val;
};
```

```js
[...generateUntil(1, v => v > 5, v => ++v)]; // [1, 2, 3, 4, 5]
```
