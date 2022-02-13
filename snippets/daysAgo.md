---
title: Days ago
tags: date,beginner
firstSeen: 2020-10-06T05:35:23+03:00
lastUpdated: 2022-01-30T11:48:07+03:00
---

Calculates the date of `n` days ago from today as a string representation.

- Use the `Date` constructor to get the current date.
- Use `Math.abs()` and `Date.prototype.getDate()` to update the date accordingly and set to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};
```

```js
daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)
```
