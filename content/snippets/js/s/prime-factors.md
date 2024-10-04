---
title: Find the prime factors of a number in JavaScript
shortTitle: Prime factors
language: javascript
tags: [math,algorithm]
cover: dark-leaves-3
excerpt: Find the prime factors of a number using trial division in JavaScript.
listed: true
dateModified: 2024-02-23
---

The **prime factors** of a number are the prime numbers that divide the number exactly. An easy way to find the prime factors of a number is using [trial division](https://en.wikipedia.org/wiki/Trial_division), which is a simple algorithm that checks each possible prime factor in order.

> [!WARNING]
>
> This algorithm is **not efficient** for large numbers, as it has a high time complexity. You should look into more efficient algorithms for prime factorization, if you plan to implement this in a production environment.

Implementing the algorithm is straightforward. You can use a `while` loop to **iterate** over all possible prime factors, starting with `2`. If the current factor, `f`, exactly divides `n`, add `f` to the factors array and divide `n` by `f`. Otherwise, increment `f` by one.

```js
const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

primeFactors(147); // [3, 7, 7]
```
