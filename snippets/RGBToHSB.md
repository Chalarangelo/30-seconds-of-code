---
title: RGB to HSB
tags: math
expertise: intermediate
cover: blog_images/dark-leaves.jpg
firstSeen: 2020-09-18T14:25:07+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Converts a RGB color tuple to HSB format.

- Use the [RGB to HSB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values is H: [0, 360], S: [0, 100], B: [0, 100].

```js
const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
```

```js
RGBToHSB(252, 111, 48);
// [18.529411764705856, 80.95238095238095, 98.82352941176471]
```
