---
title: minDate
tags: date,intermediate
---

Returns the minimum of the given dates.

- Use the ES6 spread syntax with `Math.min()` to find the minimum date value.
- Use `new Date()` to convert it to a `Date` object.

```js
const minDate = (...dates) => new Date(Math.min(...dates));
```

```js
const dates = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
minDate(...dates); // 2016-01-08T22:00:00.000Z
```
