---
title: getAllDatesBetweenTwodates
tags: date,intermediate
---

Calculates the dates between two dates.


```js
  const getDaysArray = function (s, e) {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
     return a;
  };
```

```js
 const daylist = getDaysArray(startDate, endDate); // daylist is an array that contains dates between startDate and EndDate
```
