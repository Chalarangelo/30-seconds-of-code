---
title: isLeapYear
tags: function,date,beginner
---

Returns `true` if year is leap year.

Use `new Date()`, set the date to 29st february `year`, check if the month is equal with 1 then return `true`

```js
const isLeapYear = (year) => {
    return new Date(year, 1, 29).getMonth() === 1
}
```

```js
isLeapYear(2019); // false
isLeapYear(2020); // true
```
