---
title: quadraticEquation
tags: math,beginner
---

Returns the solutions of a quadratic equation.

- Accept (a, b, c) that is, cofficients of the equation as arguments.
- Find solutions using quadratic formula.
- Return solutions as an array.

```js
const quadraticEquation = (a, b, c) => {
  let x1 = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);
  let x2 = (-b - Math.sqrt(b*b - 4*a*c))/(2*a);
  return [x1, x2];
}
```

```js
quadraticEquation(-3, 10, -3); // [ 0.3333333333333333, 3 ]
```
