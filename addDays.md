---
title: addDays
tags: date,beginner
---

Add given number of days to a date.

- Use `new Date()` or `new Date('mm/dd/yyyy')` as the date and the number of days to add as the second parameter.
- We add the number days to the given date and pass to`Date.setDate()` method.
- This method sets the day of the Date object relative to the beginning of the currently set month.

```js
const addDays = ( date, days ) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
```

```js
addDays(new Date(), 0); // 'Sat Oct 03 2020 23:36:08 GMT+0100 (British Summer Time)'
addDays(new Date(), 29); // 'Sun Nov 01 2020 23:36:50 GMT+0000 (Greenwich Mean Time)'
addDays(new Date(), -10); // 'Wed Sep 23 2020 23:38:41 GMT+0100 (British Summer Time)'
```
