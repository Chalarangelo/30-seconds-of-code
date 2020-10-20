---
title: isBetweenDates
tags: date,beginner
---

Checks if a date is between two other dates.

- Use the greater than (`>`) and less than (`<`) operators to check if `date` is between `dateStart` and `dateEnd`.

```js
const isBetweenDates = (dateStart, dateEnd, date) =>
  date > dateStart && date < dateEnd;
```

```js
isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 19)
); // false
isBetweenDates(
  new Date(2010, 11, 20),
  new Date(2010, 11, 30),
  new Date(2010, 11, 25)
); // true
```
