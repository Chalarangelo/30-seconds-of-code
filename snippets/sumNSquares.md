---
title: sumNSquares
tags: math,beginner
---

Sums every number between 1 and `n`, squared.

- Use the formula `n * (n + 1) * (2 * n + 1) / 6` to get the sum of squares between 1 and `n`.

```js
const sumNSquares = (n) => (n * (n + 1) * (2 * n + 1)) / 6;
```

```js
sumNSquares(20); // 2870
```
