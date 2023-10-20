---
title: Number has decimal digits
type: snippet
language: javascript
tags: [math]
cover: man-cup-laptop
dateModified: 2022-05-13
---

Checks if a number has any decimals digits

- Use the modulo (`%`) operator to check if the number is divisible by `1` and return the result.

```js
const hasDecimals = num => num % 1 !== 0;
```

```js
hasDecimals(1); // false
hasDecimals(1.001); // true
```
