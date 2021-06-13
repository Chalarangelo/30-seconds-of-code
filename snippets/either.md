---
title: either
tags: function,logic,beginner
firstSeen: 2020-05-13T11:35:46+03:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Checks if at least one function returns `true` for a given set of arguments.

- Use the logical or (`||`) operator on the result of calling the two functions with the supplied `args`.

```js
const either = (f, g) => (...args) => f(...args) || g(...args);
```

```js
const isEven = num => num % 2 === 0;
const isPositive = num => num > 0;
const isPositiveOrEven = either(isPositive, isEven);
isPositiveOrEven(4); // true
isPositiveOrEven(3); // true
```
