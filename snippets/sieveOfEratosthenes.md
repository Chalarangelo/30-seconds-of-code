---
title: sieveOfEratosthenes
tags: array,intermediate
---

Find all prime numbers smaller than `n`.

- Create an array of size `n + 1`.
- Iterate over the array from `2`, since `2` is the smallest prime number.
- If the index is not marked, mark all the multiples of the index.
- Iterate over the array from `2`, get all indices that are not marked. They are the prime numbers less than `n`.

```js
const sieveOfEratosthenes = (n) => {
  const nums = [...Array(n + 1)];
  for (let i = 2; i * i <= n; i++) {
    if (!nums[i]) {
      for (let j = i * i; j <= n; j += i) {
        nums[j] = true;
      }
    }
  }
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (!nums[i]) {
      primes.push(i);
    }
  }
  return primes;
};
```

```js
sieveOfEratosthenes(10); // [2, 3, 5, 7]
sieveOfEratosthenes(20); // [2, 3, 5, 7, 11, 13, 17, 19]
sieveOfEratosthenes(50); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```
