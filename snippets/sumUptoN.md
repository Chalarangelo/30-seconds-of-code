---
title: sumUptoN
tags: math,beginner
---

Returns the sum of first `n` natural numbers.

- Uses math formula `n*(n+1) / 2` to calculate the sum in `O(1)`.

```js
const sumUptoN = (n) => n * (n+1) / 2;
```

```js
sumUptoN(3); // 6
sumUptoN(5); // 15
sumUptoN(10); // 55
```
