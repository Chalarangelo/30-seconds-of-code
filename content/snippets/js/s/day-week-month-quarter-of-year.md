---
title: Find the day, week, month, or quarter of the year using JavaScript
shortTitle: Day, week, month, or quarter of year
language: javascript
tags: [date]
cover: godray-computer-mug
excerpt: Determine the day, week, month, or quarter of the year that a date corresponds to, using vanilla JavaScript.
listed: true
dateModified: 2024-01-05
---

JavaScript's `Date` API lacks a lot of methods for working with dates, which is why third-party date libraries are so popular. However, operations such as finding the day, week, month, or quarter of the year that a date corresponds to can be easily implemented without the use of libraries.

> [!NOTE]
>
> You may not be familiar with JavaScript's [numeric separators](/js/s/numeric-separator), which are used in the examples below. They're **syntactic sugar** that make large numeric values more readable.

## Day of year

Finding the day of the year (in the range `1-366`) from a `Date` object is fairly straightforward. We can use the `Date` constructor and `Date.prototype.getFullYear()` to get the **first day of the year** as a `Date` object.

Then, we can subtract the first day of the year from the given `date` and divide with the milliseconds in each day to get the result. Finally, we can use `Math.floor()` to appropriately round the resulting day count to an integer.

```js
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000);

dayOfYear(new Date('2024-09-28')); // 272
```

### Week of year

Calculating the week of the year also starts by calculating the first day of the year as a `Date` object. We can then use `Date.prototype.setDate()`, `Date.prototype.getDate()` and `Date.prototype.getDay()` along with the modulo (`%`) operator to get the first Monday of the year.

Finally, we can subtract the **first Monday of the year** from the given `date` and divide with the number of milliseconds in a week. We can use `Math.round()` to get the zero-indexed week of the year corresponding to the given `date`. **Negative zero** (`-0`) is returned if the given `date` is before the first Monday of the year.

```js
const weekOfYear = date => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
  return Math.round((date - startOfYear) / 604_800_000);
};

weekOfYear(new Date('2021-06-18')); // 23
```

### Month of year

Finding the month of the year (in the range `1-12`) from a `Date` object is the most straightforward of the bunch. Simply use `Date.prototype.getMonth()` to get the current month in the range `0-11` and add `1` to map it to the range `1-12`.

```js
const monthOfYear = date => date.getMonth() + 1;

monthOfYear(new Date('2024-09-28')); // 9
```

### Quarter of year

Finding the quarter of the year (in the range `1-4`) from a `Date` is quite simple, too. After retrieving the current month, we can use `Math.ceil()` and divide the month by `3` to get the current quarter.

```js
const quarterOfYear = date => Math.ceil((date.getMonth() + 1) / 3);

quarterOfYear(new Date('2024-09-28')); // 3
```
