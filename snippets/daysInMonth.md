---
title: daysInMonth
tags: date,beginner
firstSeen: 2021-06-13T05:00:00-04:00
---

Gets the number of days in the given `month` of the specified `year`.

- Use the `new Date()` constructor to create a date from the given `year` and `month`.
- Set the days parameter to `0` to get the last day of the previous month, as months are zero-indexed.
- Use `Date.prototype.getDate()` to return the number of days in the given `month`. 

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
```

```js
daysInMonth(2020, 12)); // 31
daysInMonth(2024, 2)); // 29
```
