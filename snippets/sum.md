---
title: sum
tags: math,array,beginner
firstSeen: 2017-12-29T13:29:49+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Calculates the sum of two or more numbers/arrays.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
```

```js
sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10
```
