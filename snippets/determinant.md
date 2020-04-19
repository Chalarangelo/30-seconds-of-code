---
title: determinant
tags: utility,beginner
---

This snippet will allow the user to find 
the determinant of a square 2x2 matrix. Given an array, 
(e.g., arg = [a,b,c,d]) the determinant would be ad-bc. 

```js
const determinant = arg =>
  {
    if(arg.length !== 4) {
      return "Error, not a square matrix";
    }else {
      let a = arg[0]
      let b = arg[1]
      let c = arg[2]
      let d = arg[3]
      return ((a*d) - (c*b))
    }
  }
```

```js
let arg = [1,2,3,4]
determinant(arg); // -2
```
