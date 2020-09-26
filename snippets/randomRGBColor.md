---
title: randomRgbColor
tags: color, rgb, beginner
---

Returns an object containing random values for red, green and blue

- Chooses three random numbers and assign them to properties in an object.
- Numbers are in range [0, 255].

```js
const randomRGBColor = () => {
  return {
    r: Math.floor(Math.random() * 255), 
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  }
}
```

```js
randomRGBColor(); // { r: 69, g: 29, b: 44 }
```
