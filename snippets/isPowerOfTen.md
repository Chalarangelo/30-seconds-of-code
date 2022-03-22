---
title: Number is power of ten
tags: math
expertise: beginner
author: chalarangelo
firstSeen: 2021-01-06T22:53:58+02:00
lastUpdated: 2021-01-06T22:53:58+02:00
---

Checks if the given number is a power of `10`.

- Use `Math.log10()` and the modulo operator (`%`) to determine if `n` is a power of `10`.

```js
const isPowerOfTen = n => Math.log10(n) % 1 === 0;
```

```js
isPowerOfTen(1); // true
isPowerOfTen(10); // true
isPowerOfTen(20); // false
```
