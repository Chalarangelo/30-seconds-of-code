---
title: Day of year
tags: date,beginner
firstSeen: 2018-09-29T13:22:20+03:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Gets the day of the year (number in the range 1-366) from a `Date` object.

- Use the `Date` constructor and `Date.prototype.getFullYear()` to get the first day of the year as a `Date` object.
- Subtract the first day of the year from `date` and divide with the milliseconds in each day to get the result.
- Use `Math.floor()` to appropriately round the resulting day count to an integer.

```js
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
```

```js
dayOfYear(new Date()); // 272
```
