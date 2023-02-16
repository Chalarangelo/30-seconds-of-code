---
title: Week of year
tags: date
author: chalarangelo
cover: godray-computer-mug
firstSeen: 2021-08-15T05:00:00-04:00
---

Returns the zero-indexed week of the year that a date corresponds to.

- Use the `Date` constructor and `Date.prototype.getFullYear()` to get the first day of the year as a `Date` object.
- Use `Date.prototype.setDate()`, `Date.prototype.getDate()` and `Date.prototype.getDay()` along with the modulo (`%`) operator to get the first Monday of the year.
- Subtract the first Monday of the year from the given `date` and divide with the number of milliseconds in a week.
- Use `Math.round()` to get the zero-indexed week of the year corresponding to the given `date`.
- `-0` is returned if the given `date` is before the first Monday of the year.

```js
const weekOfYear = date => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
  return Math.round((date - startOfYear) / (7 * 24 * 3600 * 1000));
};
```

```js
weekOfYear(new Date('2021-06-18')); // 23
```
