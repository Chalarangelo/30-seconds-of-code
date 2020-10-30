---
title: changeLightness
tags: string,browser,regexp,beginner
---

Returns the string value of the color with changed lightness in `hsl` format.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Clamp new lightness within the hsl valid range between `0` and `100`.
- Form a valid `hsl` color string.

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
changeLightness(10, "hsl(330, 50%, 50%)"); // 'hsl(330, 50%, 60%)' - lightens the color by 10%
changeLightness(-10, "hsl(330, 50%, 50%)"); // 'hsl(330, 50%, 40%)' - darkens the color by 10%
```
