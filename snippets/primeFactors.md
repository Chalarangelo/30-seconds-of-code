---
title: Prime factors of number
tags: math,algorithm
expertise: beginner
author: maciv
cover: blog_images/dark-leaves-3.jpg
firstSeen: 2020-12-28T13:11:01+02:00
lastUpdated: 2020-12-28T13:11:01+02:00
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
