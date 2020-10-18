---
title: addWeekDays
tags: date,intermediate
---

Returns a date after adding given number of business days.

- Use `Array.from()` to construct an array with `length` equal to the `count` of business days to be added.
- Use `Array.prototype.reduce()` to iterate over the array, starting from `startDate` and incrementing, using `Date.getDate()` and `Date.setDate()`.
- If the current `date` is on a weekend, update it again by adding either one day or two days to make it a weekday.

```js
const addWeekDays = (startDate, count) => 
  Array
    .from({ length: count })
    .reduce(date => {
      date = new Date(date.setDate(date.getDate() + 1));
      if (date.getDay() % 6 === 0)
        date = new Date(date.setDate(date.getDate() + ((date.getDay() / 6) + 1)));
      return date;
    }, startDate);
```

```js
addWeekDays(new Date('Oct 09, 2020'), 5); // 'Oct 16, 2020'
addWeekDays(new Date('Oct 12, 2020'), 5); // 'Oct 19, 2020'
```
