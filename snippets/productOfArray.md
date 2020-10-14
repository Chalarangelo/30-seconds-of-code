---
title: productOfArray
tags: array,beginner
---

Returns product of the array.

- Iterates through an array of numbers to return the product.

```js
const productOfArray = arr => {
  let result = 1;
  for (let i = 0; i < arr.length; i++) result *= arr[i];
  return result; 
}
```

```js
productOfArray([2, 5, 3]); // 30
```
