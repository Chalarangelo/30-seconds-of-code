---
title: lighten
tags: string,browser,regexp,beginner
---

Returns the string value for the lightened color in `hsl` format.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Clamp new lightness within the hsl valid range between `0` and `100`.
- Form a valid `hsl` color string.

```js
const lighten = (amount, hslStr) => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + parseFloat(amount))
  );

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};
```

```js
lighten(10, "hsl(330, 50%, 50%)"); // 'hsl(330, 50%, 60%)'
```
