---
title: Check if a JavaScript date is inside business hours
shortTitle: Date inside business hours
language: javascript
tags: [date]
cover: shelf-plant
excerpt: Leverage the `Date` object to check if a given date is inside business hours.
listed: true
dateModified: 2024-03-13
---

Checking if a given date is inside business hours is a fairly important piece of code that most developers need to write at some point. Luckily, JavaScript's `Date` object makes it easy to work with dates and times.

## Using the `Date` object

The `Date` object in JavaScript provides a number of methods to work with dates and times. We can use `Date.prototype.getDay()` and `Date.prototype.getHours()` methods to get the **day of the week** and the **hour of the day**, respectively.

Then, we can use a simple comparison to check if the date is inside business hours, by checking if the day is between `1` (Monday) and `5` (Friday) and if the hour is between `9` (9 AM) and `17` (5 PM).

```js
const startDay = 1; // Monday
const endDay = 5; // Friday
const startHour = 9; // 9:00 AM
const endHour = 17; // 5:00 PM

const isInsideBusinessHours = (date = new Date()) => {
  const day = date.getDay();
  const hour = date.getHours();
  return day >= startDay && day <= endDay &&
         hour >= startHour && hour < endHour;
};
```

> [!NOTE]
>
> The above code is configured to work with business hours from `9:00 AM` to `5:00 PM` (both inclusive), Monday to Friday. You can easily change the `startDay`, `endDay`, `startHour`, and `endHour` variables to match your business hours.

## Using `Intl.DateTimeFormat` for specific timezones

Depending on where you are in the world and if your users are on the same timezone, you might want to get the time for a **specific timezone**. This is significantly more involved, but can be done using `Intl.DateTimeFormat`.

Using the `Intl.DateTimeFormat()` constructor with appropriate options, we can format the date and time in a specific timezone. We can then use the `Intl.DateTimeFormat.prototype.formatToParts()` method to get the date and time as an array of objects, which we can then parse to get the `weekday`, `day`, `month`, and `hour`.

Having this segments, we can compare them to the start and end hours to check if the date is inside business hours. Additionally, we can also check if the date is a **weekday or a weekend**, and check if it's a **holiday** by comparing it to a list of holidays.

```js
const holidays = [
  [1, 1], // New Year's Day
  [6, 1], // Epiphany
  [25, 3], // Greek Independence Day
  [1, 5], // Labour Day
  [15, 8], // Dormition of the Holy Virgin
  [28, 10], // Ochi Day
  [25, 12], // Christmas Day
  [26, 12] // Boxing Day
];

const dateTimeFormatOptions = {
  timeZone: 'Europe/Athens',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'narrow',
  hour: 'numeric',
  hour12: false,
  minute: 'numeric'
};

const startHour = 9, endHour = 17;

const isInsideHours = (hour) => hour >= startHour && hour < endHour;

const isWeekday = (weekday) => weekday !== 'S';

const isHoliday = (day, month) =>
  holidays.some(([hDay, hMonth]) => hDay === day && hMonth === month);

const parseDateSegments = (date = new Date()) =>
  new Intl.DateTimeFormat('en-US', dateTimeFormatOptions)
    .formatToParts(date)
    .reduce((acc, part) => {
      const { type, value } = part;
      if (type === 'weekday') acc.weekday = value;
      else if (type !== 'literal') acc[type] = parseInt(value, 10);
      return acc;
    }, {});

export const isInsideBusinessHours = (date = new Date()) => {
  const { weekday, day, month, hour } = parseDateSegments(date);

  return isInsideHours(hour) && isWeekyday(weekday) && !isHoliday(day, month);
};
```
