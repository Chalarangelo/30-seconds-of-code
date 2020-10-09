---
title: DECIMALtoHEX
tags: math,intermediate
---

Convert a Decimal number into HEX.

- Convert given decimal number into a Hexadecimal string using toString(16).

```js
const decToHex = decimal =>
{
  let hex = Number(decimal).toString(16).toUpperCase();
    while (hex.length < 2)
      hex = "0" + hex;
  return hex;
};
```

```js
decToHex(555); // 22B
decToHex(1212); // 4BC
```
