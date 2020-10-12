---
title: addDaysToDate
tags: date,beginner
---

Return the date of `n` days from any given date.

- Use `new Date()` to read the first parameter as a valid Date
- Add `n` number of days to the given date
- Return the output in `yyyy-MM-dd` format by using `Date.prototype.toISOString()` and removing timestamp
- For example, adding `15` to `1 October 2020` results to `16 October 2020`
- Also accepts negative numbers. For example, adding `-15` to `16 October 2020` results to `1 October 2020`

```js
const addDaysToDate = (d,n) => {
  d = new Date(d);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
```

```js
addDaysToDate("2020-10-15", -10); // '2020-10-05'
addDaysToDate("2020-10-15", 10); // '2020-10-25'
addDaysToDate("10/15/2020", 10); // '2020-10-25'
addDaysToDate("2020-10-31", 1); // '2020-11-01'
addDaysToDate("12/31/2020", 31); // '2021-01-31'
```
