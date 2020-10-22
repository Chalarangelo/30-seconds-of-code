---
title: isSkewSymmetricMatrix
tags: array,matrix,beginner
---

Check wether a given matrix is skew symmetric or not.

- Use `Array.prototype.createEmptyMatrix()` to create a matrix of given order whose elements are initialized to `undefined`.
- Use `Array.prototype.transposeOfMatrix()` to calculate transpose of a given matrix.
- Returns `true` if given matrix is skew symmetric and vice versa.

```js
const createEmptyMatrix = (rows, columns) => Array(rows).fill().map(() => Array(columns).fill(undefined));

const transposeOfMatrix = matrix => {
  let result = createEmptyMatrix(matrix.length, matrix.length);
  for (let i = 0; i < matrix.length; ++i)
    for (let j = 0; j < matrix.length; ++j)
      result[i][j] = matrix[j][i];
  return result;
};

const isSkewSymmetricMatrix = matrix => {
  const transposeMatrix = transposeOfMatrix(matrix);
  for (let i = 0; i < matrix.length; ++i)
    for (let j = 0; j < matrix.length; ++j)
      if (matrix[i][j] !== -transposeMatrix[i][j])
        return false;
  return true;
}
```

```js
const matrix = [
  [0, -1, -1],
  [1, 0, -1],
  [1, 1, 0]
];
isSkewSymmetricMatrix(matrix); //true
```
