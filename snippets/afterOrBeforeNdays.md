---
title: afterBeforeNdays
tags: date, date-count
---

To get the date after a specific number of days

- It use `new Date()` to get present date.
- Then it set the date by adding the number of days to the existing date to show result.

```js
afterBeforeNdays = nDays =>{
    var today = new Date();
    var result = today.setDate(today.getDate()+nDays);
    return new Date(result)
}
```

```js
// Today date as Sun Oct 04 2020
afterBeforeNdays(10); // Wed Oct 14 2020 22:42:10 GMT+0530 (India Standard Time)
afterBeforeNdays(365); // Mon Oct 04 2021 22:43:19 GMT+0530 (India Standard Time)
afterBeforeNdays(-30); // Fri Sep 04 2020 22:44:00 GMT+0530 (India Standard Time)
```
