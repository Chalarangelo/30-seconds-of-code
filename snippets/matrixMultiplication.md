---
title: matrixMultiplication
tags: array, algorithm, math, intermediate
firstSeen: 2021-08-24 11:27:05 -0400
---

Multiplies two matrices represented by 2D arrays together.

- Use `Array.prototype.fill()` and `Array.prototype.map()` to generate a `aRows` ⨯ `bColumns` matrix with values of `0`.
- Loop over the matrices and gather results in `product`. 

```js
const matrixMultiplication = (a, b) => {
  const [aRows, aColumns, bColumns] = [a.length, a[0].length, b[0].length];
  const product = Array(aRows).fill().map(() => Array(bColumns).fill(0));
  for (let i = 0; i < aRows; i++) {
    for (let j = 0; j < bColumns; j++) {
      for (let k = 0; k < aColumns; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return product;
};
```

```js
matrixMultiplication([[1, 2], [0, 1], [2, 3]], [[2, 5, 1], [6, 7, 1]]); // [[14, 19, 3], [6, 7, 1], [22, 31, 5]
```
