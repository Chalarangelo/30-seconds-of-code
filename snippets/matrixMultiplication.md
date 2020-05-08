---
title: matrixMultiplication
tags: utility,intermediate
---

This snippet of code will multiply two 2x2 matricies.
Given two arrays in the form of [a,b,c,d], each letter represents the following:
a = number in the  first row first column
b = number in the first row second column 
c = number in the second row first column
d = number in the second row second column

The output will be an array representing the product 
```js
const matrixMultiplier = function(a,b) {
  let r1c1 = a[0] * b[0] + a[1] * b[2];
  let r1c2 = a[0] * b[1] + a[1] * b[3];
  let r2c1 = a[2] * b[0] + a[3] * b[2];
  let r2c2 = a[2] * b[1] + a[3] * b[3];
  return [r1c1,r1c2,r2c1,r2c2];
}
```

```js
let a = [1,2,3,4]
let b = [1,2,3,4]
matrixMultiplier(a,b); // [7,10,15,22]
```
