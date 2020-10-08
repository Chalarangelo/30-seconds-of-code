---
title: gauss-sum
tags: math,beginner
---

Sums the numbers between 1 up to `limit` argument.

- It is an implementation of the Gauss sum equation.

```js
const gaussSum = limit =>
  (limit * (limit + 1)) / 2;
```

```js
gaussSum(100); // 1 + 2 + 3 + 4 + ... + 100 = 5050
```
