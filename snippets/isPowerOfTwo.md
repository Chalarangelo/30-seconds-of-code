---
title: Number is power of two
tags: math
expertise: beginner
firstSeen: 2019-12-31T13:17:12+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
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
