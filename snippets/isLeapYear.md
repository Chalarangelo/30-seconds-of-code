---
title: Check for leap year
tags: date,beginner
firstSeen: 2020-02-05T14:00:03+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the given `year` is a leap year.

- Use the `Date` constructor, setting the date to February 29th of the given `year`.
- Use `Date.prototype.getMonth()` to check if the month is equal to `1`.

```js
const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;
```

```js
isLeapYear(2019); // false
isLeapYear(2020); // true
```
