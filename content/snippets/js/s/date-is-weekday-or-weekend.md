---
title: Determine if a JavaScript date is a weekday or weekend
shortTitle: Date is weekday or weekend
language: javascript
tags: [date]
cover: tropical-bike
excerpt: Quickly and easily determine if a given JavaScript `Date` object is a weekday or weekend.
listed: true
dateModified: 2024-01-06
---

I've often found myself needing to check if a given **date is a weekday or weekend**. As I'm not particularly fond of using libraries for such simple tasks, I've come up with a couple of simple helper functions to do the job.

```js
const isWeekday = date => date.getDay() % 6 !== 0;
const isWeekend = date => date.getDay() % 6 === 0;

isWeekday(new Date('2024-01-05')); // true
isWeekend(new Date('2024-01-05')); // false

isWeekday(new Date('2024-01-06')); // false
isWeekend(new Date('2024-01-06')); // true
```

The entire premise of these snippets is quite simple. We use `Date.prototype.getDay()` to get the **day of the week**, which is a number between `0` and `6`, where `0` is Sunday and `6` is Saturday. We then use the modulo operator (`%`) to check if the day is a multiple of `6`, which is the case for both Saturday and Sunday. If the remainder is `0`, we know the date is a weekend. If the remainder is not `0`, we know the date is a weekday.
