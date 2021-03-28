---
title: getRandomRGBaColor
tags: math,random,beginner
---

Generates a random color in RGBa.

- Use `Math.random()` to generate a random number within an inclusive range
- Randomize the alpha channel only if `hasAlpha` is true

```js
const getRandomRGBaColor = (hasAlpha) => {
  const randomNumberInclusiveRange = (min, max) =>
    Math.floor(Math.random() * (max + 1 - min) + min);
  const red = randomNumberInclusiveRange(0, 255);
  const green = randomNumberInclusiveRange(0, 255);
  const blue = randomNumberInclusiveRange(0, 255);
  const alpha = hasAlpha ? randomNumberInclusiveRange(1, 10) / 10 : 1;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
```

```js
getRandomRGBaColor(); // 'rgba(253, 120, 34, 1)'
getRandomRGBaColor(true); // 'rgba(33, 106, 162, 0.2)'
```
