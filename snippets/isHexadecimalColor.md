---
title: isHexadecimalColor
tags: string,regexp,intermediate
---

Check if a string is a Hexadecimal Color.

- Use `RegExp.prototype.test()` to check if input string matches against hexadecimal color regex pattern.

```js
const isHexadecimalColor = (color) =>
  /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
```

```js
isHexadecimalColor('#0090'); // true
isHexadecimalColor('#aaa123'); // true
isHexadecimalColor('0002'); // false
isHexadecimalColor('#MNOPQ'); // false
```
