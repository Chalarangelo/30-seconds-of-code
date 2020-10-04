---
title: yesterday
tags: date,intermediate
---

Results in a string representation of yesterday's date.

- Use `new Date()` to get the current date, decrement by one using `Date.getDate()` and set the value to the result using `Date.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const yesterday = () => {
  let t = new Date();
  t.setDate(t.getDate() - 1);
  return t.toISOString().split('T')[0];
};
```

```js
yesterday(); // 2018-10-17 (if current date is 2018-10-18)
```
