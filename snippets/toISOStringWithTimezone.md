---
title: toISOStringWithTimezone
tags: date,intermediate
---

Converts a date to extended ISO format (ISO 8601), including timezone offset.

- Use `Date.prototype.getTimezoneOffset()` to get the timezone offset and reverse it, storing its sign in `diff`.
- Define a helper function, `pad`, that normalizes any passed number to an integer using `Math.floor()` and `Math.abs()` and pads it to `2` digits, using `String.prototype.padStart()`.
- Use `pad()` and the built-in methods in the `Date` prototype to build the ISO 8601 string with timezone offset.

```js
const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};
```

```js
toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'
```
