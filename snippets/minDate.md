---
title: Min date
tags: date
expertise: intermediate
firstSeen: 2018-09-29T13:38:20+03:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Returns the minimum of the given dates.

- Use the ES6 spread syntax with `Math.min()` to find the minimum date value.
- Use the `Date` constructor to convert it to a `Date` object.

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
