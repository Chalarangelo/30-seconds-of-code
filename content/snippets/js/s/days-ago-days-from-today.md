---
title: How can I find the date of n days ago from today using JavaScript?
shortTitle: Days ago from today
language: javascript
tags: [date]
cover: orange-wedges
excerpt: Calculate the date of `n` days ago from today or the date of `n` days from now.
listed: true
dateModified: 2024-01-07
---

As mentioned previously, `Date` objects in JavaScript act similar to numbers. This means that you can easily **add or subtract days from a date** by using the `Date.prototype.getDate()` and `Date.prototype.setDate()` methods.

> [!NOTE]
>
> I've covered how you can [add days to a date](/js/s/add-minutes-hours-days-to-date#add-days-to-date) in detail. I strongly recommend reading more about the topic, as it can come in handy in many situations.

Using these methods, we can easily calculate the date of `n` days ago from today. We can also do the same to calculate the date of `n` days from today.

```js
const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d;
};

const daysFromToday = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d;
};

daysAgo(20); // 2023-12-17 (if current date is 2024-01-06)
daysFromToday(20); // 2024-01-26 (if current date is 2024-01-06)
```
