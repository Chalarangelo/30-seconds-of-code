---
title: Date is same as another date
type: snippet
language: javascript
tags: [date]
cover: boulder-beach
dateModified: 2020-11-03
---

Checks if a date is the same as another date.

- Use `Date.prototype.toISOString()` and strict equality checking (`===`) to check if the first date is the same as the second one.

```js
const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();
```

```js
isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true
```
