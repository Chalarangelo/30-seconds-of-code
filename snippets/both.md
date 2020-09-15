---
title: both
tags: function,logic,beginner
---

Returns `true` if both functions return `true` for a given set of arguments, `false` otherwise.

- Use the logical and (`&&`) operator on the result of calling the two functions with the supplied `args`.

```js
const both = (f, g) => (...args) => f(...args) && g(...args);
```

```js
const isEven = num => num % 2 === 0;
const isPositive = num => num > 0;
const isPositiveEven = both(isEven, isPositive);
isPositiveEven(4); // true
isPositiveEven(-2); // false
```
