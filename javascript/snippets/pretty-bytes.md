---
title: Pretty-print number of bytes
type: snippet
tags: [string,math]
cover: digital-nomad
dateModified: 2020-10-22T20:24:04+03:00
---

Converts a number in bytes to a human-readable string.

- Use an array dictionary of units to be accessed based on the exponent.
- Use `Number.prototype.toPrecision()` to truncate the number to a certain number of digits.
- Return the prettified string by building it up, taking into account the supplied options and whether it is negative or not.
- Omit the second argument, `precision`, to use a default precision of `3` digits.
- Omit the third argument, `addSpace`, to add space between the number and unit by default.

```js
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(
    Math.floor(Math.log10(num < 0 ? -num : num) / 3),
    UNITS.length - 1
  );
  const n = Number(
    ((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision)
  );
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};
```

```js
prettyBytes(1000); // '1 KB'
prettyBytes(-27145424323.5821, 5); // '-27.145 GB'
prettyBytes(123456789, 3, false); // '123MB'
```
