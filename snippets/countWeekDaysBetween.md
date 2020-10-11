---
title: countWeekDaysBetween
tags: date, intermediate
---

Returns the weekdays count between two dates.

- Takes startDate and endDate as inputs.
- Executes a while loop if startDate is less than endDate and increments count if startDate does not fall on a weekend.
- Adds one day to startDate in an iteration and the loop exits when startDate becomes equal to endDate.

```js
const countWeekDaysBetween = (startDate, endDate) => {
  let count = 0;
  while (startDate < endDate) {
    if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
      count++;
    }
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }
  return count;
}
```

```js
countWeekDaysBetween(new Date("Oct 09, 2020"), new Date("Oct 14, 2020")); // 3
```
