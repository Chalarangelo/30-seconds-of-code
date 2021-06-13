---
title: hz
tags: function,intermediate
unlisted: true
firstSeen: 2018-04-11T16:39:49+03:00
lastUpdated: 2021-01-04T13:04:15+02:00
---

Measures the number of times a function is executed per second (`hz`/`hertz`).

- Use `performance.now()` to get the difference in milliseconds before and after the iteration loop to calculate the time elapsed executing the function `iterations` times.
- Return the number of cycles per second by converting milliseconds to seconds and dividing it by the time elapsed.
- Omit the second argument, `iterations`, to use the default of 100 iterations.

```js
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return (1000 * iterations) / (performance.now() - before);
};
```

```js
const numbers = Array(10000).fill().map((_, i) => i);

const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
const sumForLoop = () => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

Math.round(hz(sumReduce)); // 572
Math.round(hz(sumForLoop)); // 4784
```
