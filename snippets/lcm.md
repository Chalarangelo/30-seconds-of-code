---
title: Least common multiple
tags: math,algorithm,recursion
expertise: intermediate
cover: blog_images/waving-over-lake.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-12-28T13:49:24+02:00
---

Calculates the least common multiple of two or more numbers.

- Use the greatest common divisor (GCD) formula and the fact that `lcm(x, y) = x * y / gcd(x, y)` to determine the least common multiple.
- The GCD formula uses recursion.

```js
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};
```

```js
lcm(12, 7); // 84
lcm(...[1, 3, 4, 5]); // 60
```
