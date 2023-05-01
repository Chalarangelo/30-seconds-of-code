---
title: Number is power of two
type: snippet
tags: [math]
author: chalarangelo
cover: flower-portrait-10
dateModified: 2020-10-20T23:02:01+03:00
---

Checks if the given number is a power of `2`.

- Use the bitwise binary AND operator (`&`) to determine if `n` is a power of `2`.
- Additionally, check that `n` is not falsy.

```js
const isPowerOfTwo = n => !!n && (n & (n - 1)) == 0;
```

```js
isPowerOfTwo(0); // false
isPowerOfTwo(1); // true
isPowerOfTwo(8); // true
```
