---
title: factorQuadratic
tags: math, beginner
---

Calculate factors of quadratic formula.

- Use 3 values to generate the calculation.
- If `a` isn't `0`, then calculate.
- The calculation return 2 values, calculate with the formula of quadration `(-b + (Math.pow(b*b-(4*a*c)), 0.5))) / (2*a)` and `(-b - (Math.pow(b*b-(4*a*c), 0.5))) / (2*a)`.
- `Math.pow()` is used for calculating square root of `b*b-(4*a*c)`
- "A can't be zero" will be printed if `a` is `0`

```js
const factorQuadratic = (a, b, c) =>
(a != 0)
  ? [ 
     (- b + (Math.pow(b * b - (4 * a * c), 0.5))) / (2 * a),
     (- b - (Math.pow(b * b - (4 * a * c), 0.5))) / (2 * a)
    ]
  : "A can't be zero";
```

```js
factorQuadratic(1, 5, 6); // [-2, -3]
factorQuadratic(0, 1, 2); // "A can't be zero"
factorQuadratic(1, 5, 4); // [-1, -4]
```
