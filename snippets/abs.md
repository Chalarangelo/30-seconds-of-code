---
title: abs
tags: math,beginner
---

Returns the absolute value of a number.

- Use `Math.abs()` to get the absolute value of a number.
- The argument may be an integer or a floating point number.

```js
const abs = number => (number < 0 ? -number : number);
```

```js
abs(-53); // 53
abs(6*-5); // 30
abs(0); // 0
```
