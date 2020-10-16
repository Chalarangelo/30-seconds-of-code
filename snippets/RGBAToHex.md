---
title: RGBAToHex
tags: string,math,intermediate
---

Converts the values of RGBA components to a hexadecimal color code.

- Convert given RGBA parameters to hexadecimal string using bitwise left-shift operator (`<<`) and `toString(16)`, then `String.padStart(6,'0')` to get a 6-digit hexadecimal value on RGB part and convert alpha, A, part by mapping to `256` portion, then `String.padStart(2, '0')` to get a 2-digit hexadecimal value.

```js
const RGBAToHex = (r, g, b, a) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0') + (Math.round(a * 256).toString(16).padStart(2, '0'));
```

```js
RGBAToHex(255, 165, 1, 0.4); // 'ffa50166'
```
