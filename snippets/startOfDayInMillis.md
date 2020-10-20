---
title: startOfDayInMillis
tags: math,date,UTC
---

Returns the starting of day in milliseconds.

- Use `new Date()` to get current date and set hours to 0 for getting start of day.
- Use `Math.floor()` to get accurate millis.

```js
const startOfDayInMillis = () => {
  return Math.floor(new Date().setUTCHours(0, 0, 0, 0) / 1000);
};
```

```js
startOfDayInMillis(); // '1603152000'
```
