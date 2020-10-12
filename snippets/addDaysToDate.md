---
title: addDaysToDate
tags: date,intermediate
---

Return the date of `n` days from the given date as a string representation.

- Use `new Date()` to create a date object from the first parameter.
- Use `Date.getDate()` and `Date.setDate()` to add `n` days to the given date.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const addDaysToDate = (date, n) => {
  d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};
```

```js
addDaysToDate('2020-10-15', 10); // '2020-10-25'
addDaysToDate('2020-10-15', -10); // '2020-10-05'
```
