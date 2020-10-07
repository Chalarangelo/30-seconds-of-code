---
title: daysAgo
tags: date,intermediate
---

Returns the date of `n` days ago from today as a string representation.

- Use `new Date()` to get the current date, `Math.abs()` and `Date.getDate()` to update the date accordingly and set to the result using `Date.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};
```

```js
daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)
```
