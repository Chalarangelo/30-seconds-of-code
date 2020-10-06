---
title: isIdentityMatrix
tags: array, intermediate, matrices, identity, linear algebra
---

Checks whether a given matrix is an identity matrix or not. Useful for applications involving Linear Algebra.

- Uses nested for loops to check for the identity matrix.
- Outer loop iterates over rows of matrix.
- Inner loop iterates over values of the rows.

```js
const isIdentityMatrix = (matrix) => {
  for (let ROW_NUMBER = 0; ROW_NUMBER < matrix.length; ROW_NUMBER++) 
     {
      for (let VALUE_NUMBER = 0; VALUE_NUMBER < matrix.length; VALUE_NUMBER++)
       {
        if (matrix[ROW_NUMBER][VALUE_NUMBER] !== 1 && ROW_NUMBER == VALUE_NUMBER || matrix[ROW_NUMBER][VALUE_NUMBER] === 1 && ROW_NUMBER !== VALUE_NUMBER)
        {
          return false;
        }
      }
    }
    return true;
}
```

```js
isIdentityMatrix([[1, 0, 0, 0],  [0, 1, 0, 0],  [0, 0, 1, 0], [0 , 0 , 0 , 1]]); // Returns 'true'
```
