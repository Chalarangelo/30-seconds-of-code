---
title: rangeGenerator
tags: function,generator,advanced
firstSeen: 2020-10-11T17:05:55+03:00
lastUpdated: 2020-10-11T17:05:55+03:00
---

Creates a generator, that generates all values in the given range using the given step.

- Use a `while` loop to iterate from `start` to `end`, using `yield` to return each value and then incrementing by `step`.
- Omit the third argument, `step`, to use a default value of `1`.

```js
const rangeGenerator = function* (start, end, step = 1) {
  let i = start;
  while (i < end) {
    yield i;
    i += step;
  }
};
```

```js
for (let i of rangeGenerator(6, 10)) console.log(i);
// Logs 6, 7, 8, 9
```
