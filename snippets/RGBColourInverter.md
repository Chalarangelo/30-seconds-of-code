---
title: RGBColourInverted
tags: math,beginner
---

Takes an RGB colour code and inverts it.

- Subtracts each component of R, G and B from 255
- Returns an array with [R, G, B] values.

```js
const RGBColourInverted = (r, g, b) => ([255-r, 255-g, 255-b]);
```

```js
RGBColourInverted(255, 0, 72); // [0, 255, 182]
```
