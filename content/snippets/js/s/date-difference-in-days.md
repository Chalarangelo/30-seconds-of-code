---
title: Date difference in days
type: snippet
language: javascript
tags: [date]
cover: spanish-resort
dateModified: 2021-04-24
---

Calculates the difference (in days) between two dates.

- Subtract the two `Date` objects and divide by the number of milliseconds in a day to get the difference (in days) between them.

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
```

```js
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
```
