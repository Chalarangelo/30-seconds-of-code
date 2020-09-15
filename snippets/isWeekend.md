---
title: isWeekend
tags: date,beginner
---

Results in a boolean representation of a specific date.

- Pass the specific date object firstly.
- Use `Date.getDay()` to check weekend based on the day being returned as 0 - 6 using a modulo operation then return a boolean.

```js
const isWeekend = (t = new Date()) => {
  return t.getDay() % 6 === 0;
};
```

```js
isWeekend(); // 2018-10-19 (if current date is 2018-10-18)
```
