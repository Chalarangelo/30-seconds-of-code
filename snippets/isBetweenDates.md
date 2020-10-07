---
title: isBetweenDates
tags: date,beginner
---

Check if a date is between two other dates

- Use the greater than operator (`>`) to check if the `date` comes after the `dateStart`.
- Use the less than operator (`<`) to check if the `date` comes before the `dateEnd`.
- Use the logical and operator (`&&`) to check if the `date` is between the `dateStart` and the `dateEnd`.

```js
const isBetweenDates = (dateStart, dateEnd, date) => date > dateStart && date < dateEnd;
```

```js
isBetweenDates(new Date(2010, 11, 20), new Date(2010, 11, 30), new Date(2010, 11, 19)); // false
isBetweenDates(new Date(2010, 11, 20), new Date(2010, 11, 30), new Date(2010, 11, 25)); // true
isBetweenDates(new Date(2010, 11, 20), new Date(2010, 11, 30), new Date(2010, 11, 31)); // false
```
