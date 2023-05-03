---
title: Number to ordinal suffix
type: snippet
tags: [math]
cover: tram-car-2
dateModified: 2020-11-13T19:49:57+02:00
---

Takes a number and returns it as a string with the correct ordinal indicator suffix.

- Use the modulo operator (`%`) to find values of single and tens digits.
- Find which ordinal pattern digits match.
- If digit is found in teens pattern, use teens ordinal.

```js
const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};
```

```js
toOrdinalSuffix('123'); // '123rd'
```
