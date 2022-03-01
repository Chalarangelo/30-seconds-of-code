---
title: Round number to given precision
tags: math
expertise: intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Rounds a number to a specified amount of digits.

- Use `Math.round()` and template literals to round the number to the specified number of digits.
- Omit the second argument, `decimals`, to round to an integer.

```js
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
```

```js
round(1.005, 2); // 1.01
```
