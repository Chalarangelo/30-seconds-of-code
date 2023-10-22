---
title: Number to fixed-point notation without trailing zeros
type: snippet
language: javascript
tags: [math,string]
cover: white-chapel
dateModified: 2022-05-10
---

Formats a number using fixed-point notation, if it has decimals.

- Use `Number.prototype.toFixed()` to convert the number to a fixed-point notation string.
- Use `Number.parseFloat()` to convert the fixed-point notation string to a number, removing trailing zeros.
- Use a template literal to convert the number to a string.

```js
const toOptionalFixed = (num, digits) =>
  `${Number.parseFloat(num.toFixed(digits))}`;
```

```js
toOptionalFixed(1, 2); // '1'
toOptionalFixed(1.001, 2); // '1'
toOptionalFixed(1.500, 2); // '1.5'
```
