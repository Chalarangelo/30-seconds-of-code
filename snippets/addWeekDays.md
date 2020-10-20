---
title: addWeekDays
tags: date,intermediate
---

Calculates the date after adding the ginen number of business days.

- Use `Array.from()` to construct an array with `length` equal to the `count` of business days to be added.
- Use `Array.prototype.reduce()` to iterate over the array, starting from `startDate` and incrementing, using `Date.prototype.getDate()` and `Date.prototype.setDate()`.
- If the current `date` is on a weekend, update it again by adding either one day or two days to make it a weekday.
- **NOTE:** Does not take official holidays into account.

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
