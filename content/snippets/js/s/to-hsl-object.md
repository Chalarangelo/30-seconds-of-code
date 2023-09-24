---
title: HSL to object
type: snippet
language: javascript
tags: [string,regexp]
cover: measuring
dateModified: 2020-10-22
---

Converts an `hsl()` color string to an object with the values of each color.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.
- Use array destructuring to store the values into named variables and create an appropriate object from them.

```js
const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};
```

```js
toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }
```
