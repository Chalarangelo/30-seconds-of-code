---
title: Last date of month
tags: date
cover: blog_images/polar-bear.jpg
firstSeen: 2020-10-09T20:36:54+03:00
lastUpdated: 2020-10-09T22:01:42+03:00
---

Returns the string representation of the last date in the given date's month.

- Use `Date.prototype.getFullYear()`, `Date.prototype.getMonth()` to get the current year and month from the given date.
- Use the `Date` constructor to create a new date with the given year and month incremented by `1`, and the day set to `0` (last day of previous month).
- Omit the argument, `date`, to use the current date by default.

```js
const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};
```

```js
lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'
```
