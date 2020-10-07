---
title: getLastDateFromNoOfMonths
tags: date,beginner
---

Gets the future date from current date from a `No of months`.

- Use `new Date()` current day of the year as a `Date` object, & divide the no of months (i.e. n) to get year & module to get month 
- Use `Math.floor()` to appropriately round the resulting day count to an integer.

```js
const getLastDateFromNoOfMonths = n => {
    let d = new Date();
    let year = Math.floor(n/12);
    let month = n % 12;
    let lastDate = new Date();
    lastDate.setFullYear(d.getFullYear() + year, d.getMonth() + month, d.getDate());
    return lastDate
}
```

```js
getLastDateFromNoOfMonths(24); // Fri Oct 07 2022
```
