---
title: vectorAngle
tags: math, beginner
---

Returns the angle (theta) value between two vectors.

Use `Math.trunc()` to convert the half of `length` to integer.
Use `Array.prototype.slice()` slice the incoming array into two vectors.
Use `Array.prototype.reduce()`, `Math.pow()` and `Math.sqrt()` to calculate the magnitude of each vector and the scalar product of the two vectors.
Use `Math.acos()` to calculate arccos and get the theta.


```js
const vectorAngle = (...x) =>{
  let half = Math.trunc(x.length / 2);
  let [a, b] = [x.slice(0, half), x.slice(half)];
  let magnitudeOfA = Math.sqrt(a.reduce((total, num) => {return total + Math.pow(num, 2);}, 0));
  let magnitudeOfB = Math.sqrt(b.reduce((total, num) => {return total + Math.pow(num, 2);}, 0));
  let scalar = a.reduce((total, num, i)=>{return total + (num * b[i])}, 0);
  return Math.acos(scalar / (magnitudeOfA * magnitudeOfB));
};
```

```js
vectorAngle(3,4,4,3); // 0.283794109208328
```
