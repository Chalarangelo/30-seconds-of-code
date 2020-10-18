---
title: countWeekDaysBetween
tags: date,intermediate
---

Returns the weekday count between two dates.

- Use `Array.from()` to construct an array with `length` equal to the number of days between `startDate` and `endDate`.
- Use `Array.prototype.reduce()` to iterate over the array, checking if each date is a weekday and incrementing `count`.
- Update `startDate` with the next day each loop using `Date.getDate()` and `Date.setDate()` to advance it by one day.

```js
const countWeekDaysBetween = (startDate, endDate) =>
  Array
    .from({ length: (endDate - startDate) / (1000 * 3600 * 24) })
    .reduce(count => {
      if (startDate.getDay() % 6 !== 0) count++;
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    }, 0);
```

```js
countWeekDaysBetween(new Date('Oct 05, 2020'), new Date('Oct 06, 2020')); // 1
countWeekDaysBetween(new Date('Oct 05, 2020'), new Date('Oct 14, 2020')); // 7
```
