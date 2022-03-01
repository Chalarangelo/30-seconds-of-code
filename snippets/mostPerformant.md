---
title: Most performant function
tags: function
expertise: advanced
firstSeen: 2018-02-14T13:38:45+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Returns the index of the function in an array of functions which executed the fastest.

- Use `Array.prototype.map()` to generate an array where each value is the total time taken to execute the function after `iterations` times.
- Use the difference in `performance.now()` values before and after to get the total time in milliseconds to a high degree of accuracy.
- Use `Math.min()` to find the minimum execution time, and return the index of that shortest time which corresponds to the index of the most performant function.
- Omit the second argument, `iterations`, to use a default of `10000` iterations.
- The more iterations, the more reliable the result but the longer it will take.

```js
const mostPerformant = (fns, iterations = 10000) => {
  const times = fns.map(fn => {
    const before = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    return performance.now() - before;
  });
  return times.indexOf(Math.min(...times));
};
```

```js
mostPerformant([
  () => {
    // Loops through the entire array before returning `false`
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
  },
  () => {
    // Only needs to reach index `1` before returning `false`
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
  }
]); // 1
```
