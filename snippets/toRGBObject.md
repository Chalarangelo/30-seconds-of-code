---
title: toRGBObject
tags: string,browser,regexp,intermediate
---

Converts an `rgb()` color string to an object with the values of each color.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Use array destructuring to store the values into named variables and create an appropriate object from them.

```js
const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};
```

```js
toRGBObject('rgb(255,12,0)'); // {red: 255, green: 12, blue: 0}
```
