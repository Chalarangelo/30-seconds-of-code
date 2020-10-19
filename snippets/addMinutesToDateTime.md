---
title: addMinutesToDateTime
tags: dateTime,intermediate
---

Calculates new date-time after `m` minutes from the given date-time, returning its string representation.

- Use `new Date()` to create a date object from the first parameter.
- Use `Date.getTime()` to get time part from given date, default value is 00:00:00.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd HH:MM:SS` format.


```js
const addMinutesToDateTime = (date, m) => {
  d = new Date(date);
  d = new Date(d.getTime() + m*60000);
  return (d.toISOString().split('.')[0]).replace('T',' ');
};
```

```js
addMinutesToDateTime('2020-10-19 12:00:00', 10); // '2020-10-19 12:10:00'
addMinutesToDateTime('2020-10-19', -10); // '2020-10-18 23:50:00'
```
