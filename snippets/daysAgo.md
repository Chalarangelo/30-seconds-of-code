---
title: daysAgo
tags: date,intermediate
---

Returns previous N days from today as date string representation.

- Use `new Date()` to get the current date, decrement using `Date.getDate()` and set the value to the result using `Date.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysAgo = (n) => {
  let t = new Date();
  t.setDate(t.getDate() - Math.abs(n));
  return t.toISOString().split('T')[0];
};
```

```js
daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)
```
