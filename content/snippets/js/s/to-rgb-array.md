---
title: RGB to array
type: snippet
language: javascript
tags: [string,regexp]
cover: greek-coffee
dateModified: 2021-06-13
---

Converts an `rgb()` color string to an array of values.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.

```js
const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
```

```js
toRGBArray('rgb(255, 12, 0)'); // [255, 12, 0]
```
