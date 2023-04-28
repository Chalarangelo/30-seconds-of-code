---
title: HSL to RGB
type: snippet
tags: [math]
cover: maple-leaf-palette
dateModified: 2020-10-04T11:24:27+03:00
---

Converts a HSL color tuple to RGB format.

- Use the [HSL to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], L: [0, 100].
- The range of all output values is [0, 255].

```js
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
```

```js
HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]
```
