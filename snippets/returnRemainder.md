---
title: remainder
tags: math, beginner, numbers
---

Returns the remainder.

- When a number M is divided by another number N, and if M > N, then the remainder is calculated by subtracting the maximum possible multiple of N from M.
- The remainder is always less than the divisor.
- It is also known as modulus in programming.

```js
const remainder = (dividend, divisor) => {
    return (dividend % divisor);
  }
```

```js
remainder(10,3); // 1
remainder(15,5); // 0
remainder(10,2); // 0
remainder(57,12); // 9
```