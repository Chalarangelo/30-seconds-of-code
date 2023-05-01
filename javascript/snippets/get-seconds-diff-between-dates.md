---
title: Date difference in seconds
type: snippet
tags: [date]
cover: laptop-journey
dateModified: 2021-04-24T12:39:48+03:00
---

Calculates the difference (in seconds) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a second to get the difference (in seconds) between them.

```js
const getSecondsDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 1000;
```

```js
getSecondsDiffBetweenDates(
  new Date('2020-12-24 00:00:15'),
  new Date('2020-12-24 00:00:17')
); // 2
```
