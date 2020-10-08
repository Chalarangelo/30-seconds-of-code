---
title: daysBetween.md
tags: date,begineer
---

Returns the number of days between two `Date` objects.

- Subtract the two `Date` objects and find the absolute value using `Math.abs()` 
- Divide by the number of milliseconds in a day

```js
const daysBetween = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)
```

```js
daysBetween(new Date("11-1-2020"), new Date("11-3-2020")); // 2
```