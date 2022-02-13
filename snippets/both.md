---
title: Logical and for functions
tags: function,logic,beginner
unlisted: true
firstSeen: 2020-05-13T11:35:36+03:00
lastUpdated: 2021-01-04T13:04:15+02:00
---

Checks if both of the given functions return `true` for a given set of arguments.

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
