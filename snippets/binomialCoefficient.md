---
title: binomialCoefficient
tags: math,beginner
---

Calculates the number of ways to choose `k` items from `n` items without repetition and without order.

- Use `Number.isNaN()` to check if any of the two values is `NaN`.
- Check if `k` is less than `0` or greater than or equal to `n`, then return `NaN`.
- Check if `n - k` is less than `k` and switch their values.
- Loop from `1` through `k` and calculate the binomial coefficient.
- Use `Math.round()` to account for rounding errors in the calculation.

```js
const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return NaN;
  if (n - k < k) k = n - k;
  let res = 1;
  for (let j = 1; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};
```

```js
binomialCoefficient(8, 2); // 28
```
