---
title: getDaysDiffBetweenDates
tags: date,intermediate
---

Calculates the difference (in days) between two dates.

- Subtract the two `Date` object and divide by the number of milliseconds in a day to get the difference (in days) between them.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
```

```js
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
```
