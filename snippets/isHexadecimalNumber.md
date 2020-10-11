---
title: isHexadecimalNumber
tags: string,regexp,beginner
---

Check if a string is a Hexadecimal Number

- Use `RegExp.prototype.test()` to check if input string matches against hexadecimal number regex pattern.

```js
const isHexadecimalNumber = (str) => /^[A-F0-9]+$/i.test(str);
```

```js
isHexadecimalNumber('a2d344'); // true
isHexadecimalNumber('1345'); // true
isHexadecimalNumber('23eqer'); // false
isHexadecimalNumber('#a1b3d4'); // false
```
