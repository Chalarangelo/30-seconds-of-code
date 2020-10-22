---
title: logBase
tags: math,beginner
---

Calculates the logarithm of the given number in the given base.

- Use `Math.log()` to get the logarithm from the value and the base and divide them.

```js
const logBase = (n, base) => Math.log(n) / Math.log(base);
```

```js
logBase(10, 10); // 1
logBase(100, 10); // 2
```
