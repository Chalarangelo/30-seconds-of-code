---
title: generateRGB
tags: JavaScript, rgb, generator, Math, intermediate
---

Generate a random rgb or rgba string.

- Takes one argument (object) to set the opacity to true or false. Default to false.
- Use <code>Math.floor()</code> and <code>Math.random()</code> to get a random intensity value between 0 and 255.
- Use <code>Math.random()</code> and <code>toFixed()</code> to get a random opacity value between 0 and 1.
- Create a string with random intensity values separate with commas.
- If opacity is set to true, return an rgba string with the random opacity value. Else, return an rgb string.

```js
const generateRGB = (opt = {opacity: false}) => {
    const randIntensity = () => Math.floor(Math.random() * 255);
    const randOpacity = (Math.random() * 1).toFixed(1);
    const rgb = `${randIntensity()}, ${randIntensity()}, ${randIntensity()}`;

    return opt.opacity ? `rgba(${rgb}, ${randOpacity})` : `rgb(${rgb})`;
}
```

```js
generateRGB(); // 'rgb(142, 13, 79)'
generateRGB({opacity: false}); // 'rgb(42, 123, 13)'
generateRGB({opacity: true}); // 'rgba(64, 17, 113, 0.3)'
```