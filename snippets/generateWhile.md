---
title: Generate while condition is met
tags: function,generator
expertise: advanced
firstSeen: 2022-01-21T05:00:00-04:00
---

Creates a generator, that keeps producing new values as long as the given condition is met.

- Initialize the current `val` using the `seed` value.
- Use a `while` loop to iterate while the `condition` function called with the current `val` returns `true`.
- Use `yield` to return the current `val` and optionally receive a new seed value, `nextSeed`.
- Use the `next` function to calculate the next value from the current `val` and the `nextSeed`.

```js
const generateWhile = function* (seed, condition, next) {
  let val = seed;
  let nextSeed = null;
  while (condition(val)) {
    nextSeed = yield val;
    val = next(val, nextSeed);
  }
  return val;
};
```

```js
[...generateWhile(1, v => v <= 5, v => ++v)]; // [1, 2, 3, 4, 5]
```
