---
title: RGB to array
tags: string,browser,regexp
cover: blog_images/greek-coffee.jpg
firstSeen: 2020-10-14T20:36:18+03:00
lastUpdated: 2021-06-13T13:50:25+03:00
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
