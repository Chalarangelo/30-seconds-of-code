---
title: lastDateOfMonth
tags: date,intermediate
---

Get last date in current month of given date. 
- Generate new date of the next month and use day 0 to get one day before it.

```js
const lastDateOfMonth = date => {
        return new Date(date.getFullYear(),date.getMonth()+1,0);
}
```

```js
//Current date is 10-10-2020
lastDateOfMonth(new Date()); // 'Sat Oct 31 2020 00:00:00 GMT+0700'
```
