---
title: Digitize number
tags: math
expertise: beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-18T14:58:09+03:00
---

Converts a number to an array of digits, removing its sign if necessary.

- Use `Math.abs()` to strip the number's sign.
- Convert the number to a string, using the spread operator (`...`) to build an array.
- Use `Array.prototype.map()` and `parseInt()` to transform each value to an integer.

```js
const digitize = n => [...`${Math.abs(n)}`].map(i => parseInt(i));
```

```js
digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]
```
