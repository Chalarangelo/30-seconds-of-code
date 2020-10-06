---
title: RGBToCMYK
tags: math,intermediate
---

Converts RGB color tuple to CMYK (Cyan, Magenta, Yellow, Key _(black)_) format as percentage values.

- Initially, the RGB values are normalized by dividing each of them by 255.
- Then, value of `key` (black) is calculated as `1 - max(r_norm, g_norm, b_norm)`.
- Finally, the values of Cyan, Magenta and Yellow is calculated accordingly.
- This function accepts value of R, G, B each in the range of 255 and returns an object with C, Y, M, K values as percentages.

```js
const RGBToCMYK = (r, g, b) => {
  const r_norm = r / 255;
  const g_norm = g / 255;
  const b_norm = b / 255;

  const k = 1 - Math.max(r_norm, g_norm, b_norm);

  return {
    c: (1 - r_norm - k) / (1 - k) * 100,
    m: (1 - g_norm - k) / (1 - k) * 100,
    y: (1 - b_norm - k) / (1 - k) * 100,
    k: k * 100
  };
}
```

```js
RGBToCMYK(60, 200, 120); // { c: 70, m: 0, y: 40, k: 21.568627450980394 }
```
