---
title: getMinutesDiffBetweenDates
tags: date,beginner
---

Calculates the difference (in minutes) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a minute to get the difference (in minutes) between them.

```js
const getMinutesDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 60);
```

```js
getMinutesDiffBetweenDates(
  new Date('2021-04-24 01:00:15'),
  new Date('2021-04-24 02:00:15')
); // 60
```
