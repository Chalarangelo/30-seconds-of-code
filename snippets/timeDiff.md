---
title: timeDiff
tags: function,beginner
---

Calculate the time difference between 2 given date time.

- Create 2 different Datetime variables
- Place both the variables in the parameters to get the time difference in milliseconds

```js
const timeDiff = (time1, time2) => Math.abs(time1 - time2);
```

```js
var time1 = new Date(2020, 1, 15, 8, 0); // Feb 15 2020 8am
var time2 = new Date(2020, 1, 15, 18, 0); // Feb 15 2020 6pm

timeDiff(time1, time2); // '36000000 milliseconds (10 hours)'
```
