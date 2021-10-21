---
title: dayDIf
tags: date, dif
---

compute the interval between two dates

- Use `Date.prototype.getTime()` to get the timestamp of two dates
- Use `Math.abs` to get absolute value, then divided by 86400000(1000 * 60 *60 \*24)

```js
const dayDif = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
```

```js
dayDif(new Date("2020-10-21"), new Date("2021-10-22")); // 366
```
