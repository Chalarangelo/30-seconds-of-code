---
title: divmod
tags: math,beginner
---

Returns an array consisting of the quotient and remainder of the given numbers.

- Use `Math.floor()` to get the quotient of the division `x / y`.
- Use the modulo operator (`%`) to get the remainder of the division `x / y`.

```js
const divmod = (x, y) => [Math.floor(x / y), x % y];
```

```js
divmod(8, 3); // [2, 2]
divmod(3, 8); // [0, 3]
divmod(5, 5); // [1, 0]
```
