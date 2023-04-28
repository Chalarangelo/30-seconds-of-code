---
title: Max date
type: snippet
tags: [date]
cover: interior-15
dateModified: 2020-10-21T21:54:53+03:00
---

Returns the maximum of the given dates.

- Use the ES6 spread syntax with `Math.max()` to find the maximum date value.
- Use the `Date` constructor to convert it to a `Date` object.

```js
const maxDate = (...dates) => new Date(Math.max(...dates));
```

```js
const dates = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
maxDate(...dates); // 2018-03-11T22:00:00.000Z
```
