---
title: RGBToCMYK
tags: math,intermediate
---

Converts a RGB color tuple to CMYK format.

- Use the [RGB to CMYK conversion formula](https://es.wikipedia.org/wiki/Modelo_de_color_CMYK#Mapeado_de_RGB_a_CMYK) to convert to the appropriate format.
- The range of all input parameters is [0, 255].
- The range of the resulting values ​​is in decimals [0, 1] referring to percentages (%).

```js
const RGBToCMYK = (r, g, b) => {
  if (r == 0 && g == 0 && b == 0) return [0, 0, 0, 1];
  const f1 = (n) => (1 - (n / 255)),
    [c, m, y] = [f1(r), f1(g), f1(b)],
    k = Math.min(c, Math.min(m, y)),
    f2 = (n) => ((n - k) / (1 - k));
  return [f2(c), f2(m), f2(y), k];
}
```

```js
RGBToCMYK(10,210,155); // [0.9523809523809524, 0, 0.2619047619047619, 0.17647058823529416]
```
