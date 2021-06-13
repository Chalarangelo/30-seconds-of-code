---
title: compose
tags: function,intermediate
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Performs right-to-left function composition.

- Use `Array.prototype.reduce()` to perform right-to-left function composition.
- The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.

```js
const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
```

```js
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = compose(
  add5,
  multiply
);
multiplyAndAdd5(5, 2); // 15
```
