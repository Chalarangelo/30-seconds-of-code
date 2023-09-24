---
title: Round number to given precision
type: snippet
language: javascript
tags: [math]
cover: yellow-white-mug-1
dateModified: 2020-10-22
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
