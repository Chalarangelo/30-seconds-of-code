---
title: Pipe functions
tags: function,intermediate
firstSeen: 2017-12-26T19:02:27+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Performs left-to-right function composition.

- Use `Array.prototype.reduce()` with the spread operator (`...`) to perform left-to-right function composition.
- The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const pipeFunctions = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));
```

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15
```
