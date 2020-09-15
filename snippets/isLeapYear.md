---
title: isLeapYear
tags: date,beginner
---

Returns `true` if the given `year` is a leap year, `false` otherwise.

- Use `new Date()`, setting the date to February 29th of the given `year` and use `Date.prototype.getMonth()` to check if the month is equal to `1`.

```js
const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;
```

```js
isLeapYear(2019); // false
isLeapYear(2020); // true
```
