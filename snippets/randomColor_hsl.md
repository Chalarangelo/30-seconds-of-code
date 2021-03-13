---
title: randomColor_hsl
tags: math,random,beginner
---

Generates a random color in `HSL` functional notation.

- Use `Math.random()` to generate a random value for each of the `HSL` channels (_hue_, _saturation_ and _lightness_).
- The channel `S` ranges from **0** to **360** and the channels `SL` range from **0%** to **100%**.
- Return a string in _HSL_ functional notation `hsl(h, s%, l%)`.

```js
const randomColor_hsl = () => {
  let h = Math.floor(Math.random() * 360);
  let s = Math.floor(Math.random() * 100);
  let l = Math.floor(Math.random() * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
```

```js
randomColor_hsl(); // 'hsl(131, 56%, 87%)'
```
