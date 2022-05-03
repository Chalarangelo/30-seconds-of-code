---
title: String is ISO formatted date
tags: date
expertise: intermediate
author: chalarangelo
cover: blog_images/perfect-timing.jpg
firstSeen: 2020-11-29T12:16:43+02:00
lastUpdated: 2020-11-29T12:16:43+02:00
---

Checks if the given string is valid in the simplified extended ISO format (ISO 8601).

- Use the `Date` constructor to create a `Date` object from the given string.
- Use `Date.prototype.valueOf()` and `Number.isNaN()` to check if the produced date object is valid.
- Use `Date.prototype.toISOString()` to compare the ISO formatted string representation of the date with the original string.

```js
const isISOString = val => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
};

```

```js
isISOString('2020-10-12T10:10:10.000Z'); // true
isISOString('2020-10-12'); // false
```
