---
title: getMonthDays
tags: date,intermediate
---

Get the number of days in the month according to the specified month.

- Use `new Date(year, monthIndex, day)`, set the parameter day to `0` to get last day of the month.
- Use `Date.prototype.getDate` to get the day of month. 

```js
const getMonthDays = (year, month) => {
  const today = new Date();
  
  return new Date(year || today.getFullYear(), month || (today.getMonth() + 1), 0).getDate();
};
```

```js
getMonthDays(); // 30
getMonthDays(2020, 2); // 29
getMonthDays(2021, 2); // 28
```
