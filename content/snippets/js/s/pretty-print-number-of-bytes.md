---
title: Pretty print number of bytes
language: javascript
tags: [string,math]
cover: digital-nomad
excerpt: Convert a number in bytes to a human-readable string.
listed: true
dateModified: 2024-08-13
---

Converting a **numeric byte value** into a **human-readable string** is a pretty useful tool to have in your utility belt. While seemingly easy at first sight, it takes a few steps to get right.

First and foremost, we need to define an **array of units** that we can attach to the resulting string, based on the exponent. We then need to calculate the **exponent of the number**, which will determine the unit we use. After that, we need to **truncate the number to a certain number of digits**, which can be done using `Number.prototype.toPrecision()`.

Finally, we need to build the resulting string, taking into account the options we've been given and whether the number is **negative or not**. By default, we add a space between the number and the unit, but this can be omitted, using the `addSpace` argument.

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

prettyBytes(1000); // '1 KB'
prettyBytes(-27145424323.5821, 5); // '-27.145 GB'
prettyBytes(123456789, 3, false); // '123MB'
```
