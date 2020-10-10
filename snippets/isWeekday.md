---
title: isWeekday
tags: date,beginner
---

Results in a boolean representation of a specific date.

- Pass the specific date object firstly.
- Use `Date.getDay()` to check weekday by using a modulo operator and then returning a boolean.

```js
const isWeekday = (d = new Date()) => d.getDay() % 6 !== 0;
```

```js
isWeekday(); // true (if current date is 2019-07-19)
```
