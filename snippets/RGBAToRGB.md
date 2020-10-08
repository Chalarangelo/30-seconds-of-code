---
title: RGBAToRGB
tags: math,intermediate
---

Convert a RGBA color to RGB.

- RGBA is a normal RGB color with a specified opacity.Sometimes people use RGBA to describe a *lighten* variant of a RGB color, especially in design/mockup/prototype. In order to get exact color value, we have to put that RGBA on a white background (*#fff*) and *pick* color from it. This function helps to quickly calculate corresponding RGB value from RGBA.
- The range of all input parameters is R,G,B: [0,255], A:(float) [0,1].
- The range of the resulting values is R: [0, 255], G: [0, 255], B: [0, 255].

```js
const RGBAToRGB = (r,g,b,a) => {
    return [
         Math.ceil((1 - a) * 255 + a * r),
         Math.ceil((1 - a) * 255 + a * g),
         Math.ceil((1 - a) * 255 + a * b)
    ];
}
```

```js
RGBAToRGB(25,123,12,0.5); // [140, 189, 134]
