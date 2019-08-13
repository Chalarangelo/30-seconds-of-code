---
title: digitize
tags: math,array,beginner
---

Converts a number to an array of digits.

Convert the number to a string, using the spread operator (`...`) to build an array.
Use `Array.prototype.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...`${n}`].map(i => parseInt(i));
```

```js
digitize(123); // [1, 2, 3]
```