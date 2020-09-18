---
title: RGBToHSB
tags: math, intermediate
---

- Range of parameter values:
  - r : [0,255]
  - g : [0,255]
  - b : [0,255]

- Converts given RGB parameters into HSB ones using [this](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) method and returns it in array format.

```js
const RGBToHSB =  (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const v = Math.max(r,g,b), n = v - Math.min(r,g,b);
  const h = n && v === r 
    ? (g - b) / n 
    : v === g 
      ? 2 + (b - r) / n 
      : 4 + (r - g) / n; 
  return [60 * (h < 0 ? h + 6 : h), v && n / v * 100, v * 100];
};
```

```js
RGBToHSB(252, 111, 48); // [18.529411764705856, 80.95238095238095, 98.82352941176471]
```
