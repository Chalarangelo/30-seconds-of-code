---
title: Extend hex value
tags: string
cover: blog_images/red-mountain.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Extends a 3-digit color code to a 6-digit color code.

- Use `Array.prototype.map()`, `String.prototype.split()` and `Array.prototype.join()` to join the mapped array for converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
- `Array.prototype.slice()` is used to remove `#` from string start since it's added once.

```js
const extendHex = shortHex =>
  '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');
```

```js
extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```
