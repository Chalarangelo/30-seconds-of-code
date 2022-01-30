---
title: addMinutesToDate
tags: date,intermediate
firstSeen: 2020-11-28T19:27:46+02:00
lastUpdated: 2020-11-28T19:27:46+02:00
---

Calculates the date of `n` minutes from the given date, returning its string representation.

- Use the `Date` constructor to create a `Date` object from the first argument.
- Use `Date.prototype.getTime()` and `Date.prototype.setTime()` to add `n` minutes to the given date.
- Use `Date.prototype.toISOString()`, `String.prototype.split()` and `String.prototype.replace()` to return a string in `yyyy-mm-dd HH:MM:SS` format.


```js
const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60000);
  return d.toISOString().split('.')[0].replace('T',' ');
};
```

```js
addMinutesToDate('2020-10-19 12:00:00', 10); // '2020-10-19 12:10:00'
addMinutesToDate('2020-10-19', -10); // '2020-10-18 23:50:00'
```
