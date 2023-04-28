---
title: Quarter of year
type: snippet
tags: [date]
cover: fallen-leaves
dateModified: 2020-10-22T20:24:04+03:00
---

Returns the quarter and year to which the supplied date belongs to.

- Use `Date.prototype.getMonth()` to get the current month in the range (0, 11), add `1` to map it to the range (1, 12).
- Use `Math.ceil()` and divide the month by `3` to get the current quarter.
- Use `Date.prototype.getFullYear()` to get the year from the given `date`.
- Omit the argument, `date`, to use the current date by default.

```js
const quarterOfYear = (date = new Date()) => [
  Math.ceil((date.getMonth() + 1) / 3),
  date.getFullYear()
];
```

```js
quarterOfYear(new Date('07/10/2018')); // [ 3, 2018 ]
quarterOfYear(); // [ 4, 2020 ]
```
