---
title: Check for leap year
type: snippet
language: javascript
tags: [date]
cover: flowering-hills
dateModified: 2020-10-20
---

Checks if the given `year` is a leap year.

- Use the `Date` constructor, setting the date to February 29th of the given `year`.
- Use `Date.prototype.getMonth()` to check if the month is equal to `1`.

```js
const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;
```

```js
isLeapYear(2019); // false
isLeapYear(2020); // true
```
