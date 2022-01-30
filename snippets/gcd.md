---
title: gcd
tags: math,algorithm,recursion,intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-12-29T12:36:50+02:00
---

Calculates the greatest common divisor between two or more numbers/arrays.

- The inner `_gcd` function uses recursion.
- Base case is when `y` equals `0`. In this case, return `x`.
- Otherwise, return the GCD of `y` and the remainder of the division `x / y`.

```js
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
```

```js
gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4
```
