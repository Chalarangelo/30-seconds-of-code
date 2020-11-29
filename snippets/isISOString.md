---
title: isISOString
tags: date,intermediate
---

Checks if the given string is valid in the simplified extended ISO format (ISO 8601).

- Use `new Date()` to create a date object from the given string.
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
