---
title: nextYear
tags: date,intermediate
---

Returns this same day, next year, while accounting for leap years.

- Use the parameter retrieve the desired date or use `new Date()` to get the current date.
- Use `Date.prototype.getYear()` to retrieve the year and decide which year we should use for february check.
- Use `Date.prototype.getMonth()` to check if next february is this year or next.
- Use `Date.prototype.getMonth()` to check if next february is 29 days or not (and adjust number of days accordingly).
- Use `Date.prototype.setDate()` to set the day one year ahead.

```js
const nextYear = (d = new Date()) => {
  const yearToCheck = d.getYear() + (d.getMonth() < 3 ? 0 : 1);
  const numberOfDays = 365 + (new Date(yearToCheck, 1, 29).getMonth() === 1 ? 1 : 0);

  d.setDate(d.getDate() + numberOfDays);
  return d.toISOString().split('T')[0];
};
```

```js
nextYear(); // Returns 2021-10-22 if today is 2020-10-22
nextYear(new Date('2020-01-01')); // Returns 2021-01-01 by adding 366 days, since 2020 is a leap year
nextYear(new Date('2100-01-01')); // Returns 2101-01-01 by adding 365 days, since 2100 is a not leap year
```
