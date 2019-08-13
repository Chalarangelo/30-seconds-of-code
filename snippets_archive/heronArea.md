---
title: heronArea
tags: math,beginner
---

Returns the area of a triangle using only the 3 side lengths, Heron's formula. Assumes that the sides define a valid triangle. Does NOT assume it is a right triangle.

More information on what Heron's formula is and why it works available here: https://en.wikipedia.org/wiki/Heron%27s_formula.

Uses `Math.sqrt()` to find the square root of a value.

```js
const heronArea = (side_a, side_b, side_c) => {
    const p = (side_a + side_b + side_c) / 2
    return Math.sqrt(p * (p-side_a) * (p-side_b) * (p-side_c))
  };
```

```js
heronArea(3, 4, 5); // 6
```