---
title: RGBColourBlend
tags: math,intermediate
---

Takes 2 RGB colour codes as arrays of [R, G, B] and a blend value (as a float), and returns the blended colour as
an [R, G, B] value. The blend values is the ratio of colour 1 compared to colour 2, e.g. 0.6 means 60% colour 1,
40% colour 2.

- Multiplies each of the RGB values of colour1 by the blend value
- Multiplies each of the RGB values of colour2 by (1 - blend value)
- Returns an array with [R, G, B] values.

```js
const RGBColourBlend = (colour1, colour2, blendValue) => ([
  colour1[0]*blendValue+colour2[0]*(1-blendValue),
  colour1[1]*blendValue+colour2[1]*(1-blendValue),
  colour1[2]*blendValue+colour2[2]*(1-blendValue)
]);
```

```js
RGBColourBlend([255,0,73],[0,255,96],0.6); // [153, 102, 82.2]
```
