---
title: Calculate the quotient and remainder of a division in JavaScript
shortTitle: Quotient and remainder of division
language: javascript
tags: [math]
cover: italian-horizon
excerpt: Implement Python's `divmod()` built-in function in one line of JavaScript.
listed: true
dateModified: 2023-12-28
---

Python's [`divmod()`](https://docs.python.org/3/library/functions.html#divmod) comes in handy quite often. Its purpose is to return a **2-tuple** consisting of the **quotient** and **remainder** of a division. For example, `divmod(8, 3)` returns `(2, 2)` because `8 / 3 = 2` with a remainder of `2`.

In order to implement `divmod()` in JavaScript, we can use the built-in `Math.floor()` function to get the quotient and the modulo operator (`%`) to get the remainder of the division `x / y`.

```js
const divmod = (x, y) => [Math.floor(x / y), x % y];

divmod(8, 3); // [2, 2]
divmod(3, 8); // [0, 3]
divmod(5, 5); // [1, 0]
```
