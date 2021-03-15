---
title: randomColorN_hex
tags: math,random,intermediate
---

Generates a random _normalized_ color in _hexadecimal_ notation. The process of [color normalization](https://en.wikipedia.org/wiki/Color_normalization) makes the color vector as an unit vector (length equal to 1).

- Use `Math.random()` to randomly generate the 3 components of the `RGB` vector (_red_, _green_ and _blue_).
- Find the vector's [norm](https://en.wikipedia.org/wiki/Norm_(mathematics)) and divide all the components by this value (normalization process), making the length of the vector equal to 1.
- Use `numObj.toString([radix])` to convert each channel (base 10 number) into its _hexadecimal_ string version (base 16) by setting the **radix** as 16.
- Return a string in hexadecimal notation `#rrggbb`.

```js
const randomColorN_hex = () => {
  let r = Math.random();
  let g = Math.random();
  let b = Math.random();

  const n = Math.sqrt(r * r + g * g + b * b);

  r = Math.floor((r * 255) / n);
  g = Math.floor((g * 255) / n);
  b = Math.floor((b * 255) / n);

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  return `#${r}${g}${b}`;
};
```

```js
randomColorN_hex(); // '#2f1df8'
```
