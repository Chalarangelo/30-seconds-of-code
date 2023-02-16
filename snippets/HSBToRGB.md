---
title: HSB to RGB
tags: math
cover: houses-rock-sea
firstSeen: 2020-09-18T14:25:07+03:00
lastUpdated: 2020-09-18T14:25:07+03:00
---

Converts a HSB color tuple to RGB format.

- Use the [HSB to RGB conversion formula](https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB) to convert to the appropriate format.
- The range of the input parameters is H: [0, 360], S: [0, 100], B: [0, 100].
- The range of all output values is [0, 255].

```js
const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
```

```js
HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]
```
