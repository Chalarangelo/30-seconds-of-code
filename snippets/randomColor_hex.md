---
title: randomColor_hex
tags: math,random,beginner
---

Generates a random color in _hexadecimal_ notation.

- Use `Math.random()` to generate a random 8-bit value for each of the `RGB` channels (_red_, _green_ and _blue_).
- Use `numObj.toString([radix])` to convert each channel (base 10 number) into its _hexadecimal_ string version (base 16) by setting the **radix** as 16.
- Return a string in hexadecimal notation `#rrggbb`.

```js
const randomColor_hex = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  return `#${r}${g}${b}`;
};
```

```js
randomColor_hex(); // '#8b5c82'
```
