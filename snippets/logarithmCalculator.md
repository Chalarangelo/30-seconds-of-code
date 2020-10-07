---
title: logarithmCalculator
tags: math,beginner
---

Calculates the logarithm from given number in given base.

- Use `Math.log(value)` to get the logarithm from value
- Use `Math.log(base)` to get the logarithm from base
- Divide `Math.log(value)` by `Math.log(base)` to get logarithm of given value in given base.

```js
const logarithmCalculator = (value, base) => Math.log(value) / Math.log(base)
```

```js
logarithmCalculator(10, 10); // 1
logarithmCalculator(100, 10); // 2
```
