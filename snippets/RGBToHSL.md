---
title: RGBToHSL
tags: math,intermediate
firstSeen: 2020-10-01T23:16:30+03:00
lastUpdated: 2020-10-04T11:25:12+03:00
---

Converts a RGB color tuple to HSL format.

- Use the [RGB to HSL conversion formula](https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], L: [0, 100].

```js
const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
```

```js
RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]
```
