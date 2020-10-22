---
title: isCoprime
tags: math,beginner
---

Checks if the provided integer is a prime number.

- Check numbers from `2` to the square root of the minimum of the two numbers.
- Return `false` if any of the factors is same for both the numbers, else return `true`.

```js
const isCoprime = (num1, num2) => {
  const limit = Math.floor(Math.sqrt(Math.min(num1, num2)));
  for (var i = 2; i <= limit; i++) if (num1 % i === 0 && num2 % i === 0) return false;
  return true;
};
```

```js
isCoprime(8, 13); // true
isCoprime(4, 20); // false
```
