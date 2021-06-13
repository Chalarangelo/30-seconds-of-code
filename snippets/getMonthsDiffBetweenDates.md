---
title: getMonthsDiffBetweenDates
tags: date,intermediate
firstSeen: 2020-08-07T15:15:26+03:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Calculates the difference (in months) between two dates.

- Use `Date.prototype.getFullYear()` and `Date.prototype.getMonth()` to calculate the difference (in months) between two `Date` objects.

```js
const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );
```

```js
getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4
```
