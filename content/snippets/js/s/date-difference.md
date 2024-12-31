---
title: How to calculate date difference in JavaScript
shortTitle: Date difference
language: javascript
tags: [date]
cover: laptop-journey
excerpt: Learn how to calculate date difference in seconds, minutes, hours, days etc. in vanilla JavaScript.
listed: true
dateModified: 2024-01-06
---

Working with dates is hard, but often necessary, which is the reason why there are so many date-related libraries out there. However, some tasks, such as calculating the **difference between two dates**, can be easily accomplished with vanilla JavaScript.

> [!NOTE]
>
> You may not be familiar with JavaScript's [numeric separators](/js/s/numeric-separator), which are used in the examples below. They're **syntactic sugar** that make large numeric values more readable.

## Date difference in seconds

Calculating the date difference in seconds is as simple as subtracting the two `Date` objects and dividing by the number of milliseconds in a second (`1000`).

```js
const dateDifferenceInSeconds = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 1_000;

dateDifferenceInSeconds(
  new Date('2020-12-24 00:00:15'),
  new Date('2020-12-24 00:00:17')
); // 2
```

## Date difference in minutes

Similarly, to calculate the date difference in minutes, we only need to change the divisor to the number of milliseconds in a minute (`1000 * 60`).

```js
const dateDifferenceInMinutes = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 60_000;

dateDifferenceInMinutes(
  new Date('2021-04-24 01:00:15'),
  new Date('2021-04-24 02:00:15')
); // 60
```

## Date difference in hours

To calculate the date difference in hours, we do the same thing, but with the number of milliseconds in an hour (`1000 * 60 * 60`).

```js
const dateDifferenceInHours = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 3_600_000;

dateDifferenceInHours(
  new Date('2021-04-24 10:25:00'),
  new Date('2021-04-25 10:25:00')
); // 24
```

## Date difference in days

Subtraction can take us further still, calculating the date difference in days. Without taking timezones into account, we can simply divide the difference in milliseconds by the number of milliseconds in a day (`1000 * 60 * 60 * 24`).

```js
const dateDifferenceInDays = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 86_400_000;

dateDifferenceInDays(
  new Date('2017-12-13'),
  new Date('2017-12-22')
); // 9
```

### Date difference in weekdays

Calculating the date difference in weekdays is a bit more involved. We first need a way to determine if a [given date is a weekday](/js/s/date-is-weekday-or-weekend). Then, we need to create an array of dates between the two dates and filter out the weekends. This can be done using `Array.from()` and a [function to add days to a date](/js/s/add-minutes-hours-days-to-date#add-days-to-date). Finally, we can use `Array.prototype.filter()` to filter out the weekends and return the length of the resulting array.

```js
const isWeekday = date => date.getDay() % 6 !== 0;
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

const dateDifferenceInWeekdays = (startDate, endDate) =>
  Array
    .from({ length: (endDate - startDate) / 86_400_000 })
    .filter((_, i) => isWeekday(addDays(startDate, i + 1)))
    .length;

dateDifferenceInWeekdays(
  new Date('Oct 05, 2020'),
  new Date('Oct 06, 2020')
); // 1
dateDifferenceInWeekdays(
  new Date('Oct 05, 2020'),
  new Date('Oct 14, 2020')
); // 7
```

> [!WARNING]
>
> The above code snippet may be ill-suited for real-life scenarios, as it **doesn't take official holidays into account**. It's recommended to tweak the weekday check to include a list of known holidays, too, if you plan on using it in production.

## Date difference in weeks

Calculating the date difference in weeks is still possible with simple date subtraction. We need only divide the difference in milliseconds by the number of milliseconds in a week (`1000 * 60 * 60 * 24 * 7`).

```js
const dateDifferenceInWeeks = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 604_800_000;

dateDifferenceInWeeks(
  new Date('2023-01-01'),
  new Date('2023-01-08')
); // 1
```

## Date difference in months

Months and years are easier to calculate with other `Date` methods, instead of subtraction. In such cases, we prefer to use `Date.prototype.getFullYear()` and `Date.prototype.getMonth()` to calculate the difference between the two dates.

```js
const dateDifferenceInMonths = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

dateDifferenceInMonths(
  new Date('2017-12-13'),
  new Date('2018-04-29')
); // 4
```

## Date difference in years

Calculating the date difference in years is similar to the previous example, but we only need to divide the difference in months by `12`.

```js
const dateDifferenceInYears = (dateInitial, dateFinal) =>
  dateDifferenceInMonths(dateInitial, dateFinal) / 12;

dateDifferenceInYears(
  new Date('2017-12-13'),
  new Date('2019-12-15')
); // 2
```
