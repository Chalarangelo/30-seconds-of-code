---
title: Factorial of number
tags: math,algorithm,recursion
expertise: beginner
firstSeen: 2017-12-07T14:41:33+02:00
lastUpdated: 2020-12-28T13:49:24+02:00
---

Calculates the factorial of a number.

- Use recursion.
- If `n` is less than or equal to `1`, return `1`.
- Otherwise, return the product of `n` and the factorial of `n - 1`.
- Throw a `TypeError` if `n` is a negative number.

```js
const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);
```

```js
factorial(6); // 720
```
