---
title: Date difference in months
type: snippet
language: javascript
tags: [date]
cover: two-flower-vases
dateModified: 2020-10-19
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
