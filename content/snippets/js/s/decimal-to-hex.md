---
title: "Tip: Convert decimal number to hexadecimal"
shortTitle: Decimal to hexadecimal
type: tip
language: javascript
tags: [math]
author: chalarangelo
cover: waves-from-above
excerpt: Ever needed to convert a decimal number to hexadecimal? Here's a quick and easy way to do it.
dateModified: 2022-09-21
---

Numeric values are represented in decimal format by default, when converted to strings. If you want to display them in hexadecimal format, you can use `Number.prototype.toString()` and pass the base you want to use (`16`) as an argument.

```js
const decimalToHex = dec => dec.toString(16);

decimalToHex(0); // '0'
decimalToHex(255); // 'ff'
```

Conversely, the opposite might also be needed. You can use `parseInt()` to convert a string to a number in a given base. If you don't specify a base, it will default to `10`.

```js
const hexToDecimal = hex => parseInt(hex, 16);

hexToDecimal('0'); // 0
hexToDecimal('ff'); // 255
```
