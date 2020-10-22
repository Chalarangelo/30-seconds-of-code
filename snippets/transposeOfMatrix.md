---
title: transposeOfMatrix
tags: array,matrix,beginner
---

Calculate the transpose of a given matrix

- Use `Array.prototype.createEmptyMatrix()` to create a matrix of given order whose elements are initialized to `undefined`. 
- Returns a matrix which contain the result of transpose of matrix.


```js
const createEmptyMatrix = (rows, columns) => Array(rows).fill().map(() => Array(columns).fill(undefined));

const transposeOfMatrix = matrix => {
  let result = createEmptyMatrix(matrix.length, matrix.length);
  for (let i = 0; i < matrix.length; ++i)
    for (let j = 0; j < matrix.length; ++j)
      result[i][j] = matrix[j][i];
  return result;
};
```

```js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
transposeOfMatrix(matrix); //[[1, 4, 7], [2, 5, 8], [3, 6, 9]]
```
