---
title: Change color lightness
type: snippet
language: javascript
tags: [string,browser,regexp]
cover: aerial-view-port
dateModified: 2020-10-31
---

Changes the lightness value of an `hsl()` color string.

- Use `String.prototype.match()` to get an array of 3 strings with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Make sure the lightness is within the valid range (between `0` and `100`), using `Math.max()` and `Math.min()`.
- Use a template literal to create a new `hsl()` string with the updated value.

```js
const changeLightness = (delta, hslStr) => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + parseFloat(delta))
  );

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};
```

```js
changeLightness(10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 60%)'
changeLightness(-10, 'hsl(330, 50%, 50%)'); // 'hsl(330, 50%, 40%)'
```
