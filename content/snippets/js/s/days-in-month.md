---
title: Find the number of days in a month using JavaScript
shortTitle: Number of days in month
language: javascript
tags: [date]
cover: laptop-plants-2
excerpt: Calculate the number of days in a month for a given year using JavaScript.
listed: true
dateModified: 2024-02-26
---

Working with dates is admittedly hard, especially in JavaScript where the `Date` object is not the most intuitive. However, calculating the number of days in a month for a given year is a common task, and can be done with a single line of code.

`Date.prototype.getDate()` returns the **numeric representation of the day of the month**, which can be used to calculate the number of days in a month. By setting the days parameter to `0`, we can get the **last day of the previous month**. This effectively allows us to get the number of days in the given `month`, as **months are zero-indexed**.

Putting everything together, we can use the `Date()` constructor to create a date from the given `year` and `month`, and then use `Date.prototype.getDate()` to return the number of days in the given `month`.

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

daysInMonth(2020, 12); // 31
daysInMonth(2024, 2); // 29
```
