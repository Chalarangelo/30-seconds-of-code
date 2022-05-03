---
title: Days from now
tags: date
expertise: beginner
cover: blog_images/tent-stars.jpg
firstSeen: 2020-10-09T02:49:17+03:00
lastUpdated: 2022-01-30T11:48:07+03:00
---

Calculates the date of `n` days from today as a string representation.

- Use the `Date` constructor to get the current date.
- Use `Math.abs()` and `Date.prototype.getDate()` to update the date accordingly and set to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};
```

```js
daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)
```
