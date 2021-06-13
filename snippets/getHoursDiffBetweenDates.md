---
title: getHoursDiffBetweenDates
tags: date,beginner
firstSeen: 2021-04-24T12:56:21+03:00
lastUpdated: 2021-04-24T12:56:21+03:00
---

Calculates the difference (in hours) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in an hour to get the difference (in hours) between them.

```js
const getHoursDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600);
```

```js
getHoursDiffBetweenDates(
  new Date('2021-04-24 10:25:00'),
  new Date('2021-04-25 10:25:00')
); // 24
```
