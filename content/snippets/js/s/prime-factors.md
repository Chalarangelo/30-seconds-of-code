---
title: Prime factors of number
type: snippet
language: javascript
tags: [math,algorithm]
cover: dark-leaves-3
dateModified: 2020-12-28
---

Finds the prime factors of a given number using the trial division algorithm.

- Use a `while` loop to iterate over all possible prime factors, starting with `2`.
- If the current factor, `f`, exactly divides `n`, add `f` to the factors array and divide `n` by `f`. Otherwise, increment `f` by one.

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
```

```js
primeFactors(147); // [3, 7, 7]
```
