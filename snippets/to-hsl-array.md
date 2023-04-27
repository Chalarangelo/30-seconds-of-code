---
title: HSL to array
tags: string,regexp
cover: kettle-laptop
firstSeen: 2020-10-16T21:46:29+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Converts an `hsl()` color string to an array of values.

- Use `String.prototype.match()` to get an array of 3 string with the numeric values.
- Use `Array.prototype.map()` in combination with `Number` to convert them into an array of numeric values.

```js
const toHSLArray = hslStr => hslStr.match(/\d+/g).map(Number);
```

```js
toHSLArray('hsl(50, 10%, 10%)'); // [50, 10, 10]
```
