---
title: Standard deviation
type: snippet
tags: [math]
cover: interior-16
dateModified: 2020-10-22T20:24:30+03:00
---

Calculates the standard deviation of an array of numbers.

- Use `Array.prototype.reduce()` to calculate the mean, variance and the sum of the variance of the values and determine the standard deviation.
- Omit the second argument, `usePopulation`, to get the sample standard deviation or set it to `true` to get the population standard deviation.

```js
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};
```

```js
standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true);
// 12.29899614287479 (population)
```
