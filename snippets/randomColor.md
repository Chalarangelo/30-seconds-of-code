---
title: randomColor
tags: string,random,beginner
---

Generates a random color hex.

- Generates a random number between 0 to 15 using `Math.random()`.
- Picks character from string `0123456789abcdef` at generated index.

```js
const randomColor = () => {
  const letters = '0123456789abcdef';
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += letters.charAt(Math.floor(Math.random() * 16));
  }
  return color;
}
```

```js
randomColor(); // #7c0cf7
randomColor(); // #af5e71
```
