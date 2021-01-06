---
title: nthRoot
tags: math,beginner
---

Calculates the nth root of a given number.

- Use `Math.pow()` to calculate `x` to the power of `1/n` which is equal to the nth root of `x`.

```js
const nthRoot = (x, n) => Math.pow(x, 1 / n);
```

```js
nthRoot(32, 5); // 2
```
