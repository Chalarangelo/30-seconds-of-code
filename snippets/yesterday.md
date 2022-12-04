---
title: Date of yesterday
tags: date
cover: blog_images/travel-mug-2.jpg
firstSeen: 2019-07-19T10:57:21+03:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Results in a string representation of yesterday's date.

- Use the `Date` constructor to get the current date.
- Decrement it by one using `Date.prototype.getDate()` and set the value to the result using `Date.prototype.setDate()`.
- Use `Date.prototype.toISOString()` to return a string in `yyyy-mm-dd` format.

```js
const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};
```

```js
yesterday(); // 2018-10-17 (if current date is 2018-10-18)
```
