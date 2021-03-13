---
title: randomColor_rgb
tags: math,random,beginner
---

Generates a random color in `RGB` functional notation.

- Use `Math.random()` to generate a random 8-bit value for each of the `RGB` channels (_red_, _green_ and _blue_).
- Return a string in _RGB_ functional notation `rgb(r, g, b)`.

```js
const randomColor_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};
```

```js
randomColor_rgb(); // 'rgb(229, 185, 161)'
```
