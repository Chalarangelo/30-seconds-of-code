---
title: How can I calculate the binomial coefficient in JavaScript?
shortTitle: Binomial coefficient
language: javascript
tags: [math,algorithm]
cover: blue-red-mountain
excerpt: Calculate the number of ways to choose k items from n items without repetition and without order.
listed: true
dateModified: 2024-07-17
---

The [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) is a mathematical concept that represents the number of ways to choose `k` items from `n` items without repetition and without order. In JavaScript, you can calculate the binomial coefficient using a simple function that loops through the values and calculates the result.

Before we loop through the values, we need to handle some **edge cases**, such as when `k` is less than `0`, greater than `n`, equal to `1` or `n - 1`, or when `n` or `k` is `NaN`. We also need to switch the values of `k` and `n - k` if `n - k` is less than `k` to optimize the calculation.

After we do that, we can use a simple `for` **loop** to calculate the binomial coefficient by multiplying the values and dividing them by the loop index. Finally, we round the result to account for any **rounding errors** in the calculation, using `Math.round()`.

```js
const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;

  let res = n;
  for (let i = 2; i <= k; i++) res *= (n - i + 1) / i;
  return Math.round(res);
};

binomialCoefficient(8, 2); // 28
```
