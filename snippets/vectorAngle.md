---
title: vectorAngle
tags: math,intermediate
---

Returns the angle (theta) value between two vectors.

Use `Math.trunc()` to pick the integer value of length. Use `slice()` slice the incoming array into individual vectors. 
Use `forEach()`, `Math.pow()` and `Math.sqrt()` to iterate over the vectors and calculate the magnitude of each vector and the scalar product.
Use `Math.acos()` to calculate arccos and get the theta.


```js
const theta = ((...x) =>{ 
  let half = Math.trunc(x.length / 2);
  let a = x.slice(0 , half);
  let b = x.slice(half);  

  let magnitudeOfA = 0;
  a.forEach((a) => magnitudeOfA += Math.pow(a , 2));
  magnitudeOfA = Math.sqrt(magnitudeOfA);
  
  let magnitudeOfB = 0;
  b.forEach((b) => magnitudeOfB += Math.pow(b , 2));
  magnitudeOfB = Math.sqrt(magnitudeOfB);
  
  let scalar = 0;
  a.forEach((a , i) => scalar += a * b[i]);
  
  return Math.acos(scalar / (magnitudeOfA*magnitudeOfB));
});
```

```js
theta(3,4,4,3); // 0.283794109208328
```