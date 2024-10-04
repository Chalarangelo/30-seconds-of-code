---
title: How can I add minutes, hours or days to a JavaScript date?
shortTitle: Add minutes, hours or days to date
language: javascript
tags: [date]
cover: orange-coffee-4
excerpt: Learn how to manipulate `Date` objects to add minutes, hours, days and more.
listed: true
dateModified: 2024-01-05
---

You can't get too far in web development without stumbling upon a situation where you have to **manipulate dates**. Perhaps you need to display a delivery date or a deadline. As easy as this sounds, JavaScript doesn't provide a particularly friendly API for such tasks. But that's nothing that you can't solve with a little ingenuity.

> [!NOTE]
>
> You may not be familiar with JavaScript's [numeric separators](/js/s/numeric-separator), which are used in the examples below. They're **syntactic sugar** that make large numeric values more readable.

## Add seconds to date

The `Date` object has `Date.prototype.getTime()` and `Date.prototype.setTime()` built-in. These two methods allow us to **get the current time** in a date object and **set the time** in a date object, respectively.

All values are in **milliseconds**, so we'll have to multiply the number of seconds by `1000` before setting the time. Note, however, that **setting the time mutates the object**, so we'll also have to create a new `Date` object to avoid mutating the original.

```js
const addSecondsToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 1000);
  return d;
};

addSecondsToDate(new Date('2020-10-19 12:00:00'), 10);
// 2020-10-19 12:00:10
addSecondsToDate(new Date('2020-10-19 12:00:00'), -10);
// 2020-10-19 11:59:50
```

## Add minutes to date

Similarly to seconds, we can add minutes to a date by multiplying the number of milliseconds in a minute (`1000 * 60`) before setting the time.

```js
const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60_000);
  return d;
};

addMinutesToDate('2020-10-19 12:00:00', 10);
// 2020-10-19 12:10:00
addMinutesToDate('2020-10-19 12:00:00', -10);
// 2020-10-19 11:50:00
```

## Add hours to date

To add hours to a date, we can multiply the number of milliseconds in an hour (`1000 * 60 * 60`) before setting the time.

```js
const addHoursToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 3_600_000);
  return d;
};

addHoursToDate('2020-10-19 12:00:00', 10);
// 2020-10-19 22:00:00
addHoursToDate('2020-10-19 12:00:00', -10);
// 2020-10-19 02:00:00
```

## Add days to date

For larger values, such as days, we can use `Date.prototype.getDate()` and `Date.prototype.setDate()`, instead.

```js
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

addDaysToDate('2020-10-15', 10);
// 2020-10-25
addDaysToDate('2020-10-15', -10);
// 2020-10-05
```

### Add weekdays to date

Weekday calculations are a little more involved. We will use the previous code snippet to add days, as needed.

Before we do so, we will use `Math.sign()` to determine if we should add (`+1`) or subtract (`-1`) days. Then, we will use `Array.from()` to create an array with `length` equal to the absolute value of `n`.

Finally, we will use `Array.prototype.reduce()` to iterate over the array, starting from `date` and incrementing, using `addDaysToDate()`. If a [day is not a weekday](/js/s/date-is-weekday-or-weekend), we will add or subtract another day, as needed, until we find a weekday.

```js
const isWeekday = date => date.getDay() % 6 !== 0;

const addWeekDays = (date, n) => {
  const s = Math.sign(n);
  const d = new Date(date);
  return Array.from({ length: Math.abs(n) }).reduce((currentDate) => {
    currentDate = addDaysToDate(currentDate, s);
    while (!isWeekday(currentDate))
      currentDate = addDaysToDate(currentDate, s);
    return currentDate;
  }, d);
};

addWeekDays('2020-10-05', 5);
// 2020-10-12
addWeekDays('2020-10-05', -5);
// 2020-09-28
```

> [!WARNING]
>
> The above snippet may be ill-suited for real-life scenarios, as it **doesn't take official holidays into account**. It's recommended to tweak the weekday check to include a list of known holidays, too, if you plan on using it in production.
