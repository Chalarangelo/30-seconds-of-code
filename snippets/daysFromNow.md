---
title: daysFromNow.md
tags: date,beginner
---

Returns the date of `n` days from today as a string representation.

- Use `new Date()` and `Date.prototype.getDate()` to get the current time stamp add the number of milliseconds and use it to create a new `Date` object.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysFromNow = n =>{
  let date = new Date(new Date().getTime() + n * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
}
```

```js
daysFromNow('5'); // 2020-10-13
```
