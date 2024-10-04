---
title: How do I compare two dates in JavaScript?
shortTitle: Date comparison
language: javascript
tags: [date,comparison]
cover: pineapple-at-work
excerpt: Learn how you can compare two dates in JavaScript, determining which one comes before or after the other.
listed: true
dateModified: 2024-01-06
---

Comparing `Date` objects in JavaScript is often confusing. Equality is not as easy as you might think, you may have to consider timezones, and dates also act like numbers. That's a lot to wrap your head around, so let's take a look at each of these use-cases in detail.

## Date equality comparison

Comparing two dates using the [equality operators (`==` or `===`)](/js/s/equality) is ineffective, as it compares the objects **by reference**. Luckily, `Date.prototype.toISOString()` returns a string representation of the date in a **standardized format**, which can be used to compare two dates.

```js
const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

isSameDate(new Date('2020-10-20'), new Date('2020-10-20')); // true
```

## Date is before another date

As mentioned previously, `Date` objects act like numbers. This means that you can use the less than operator (`<`) to check if a date comes before another date.

```js
const isBeforeDate = (dateA, dateB) => dateA < dateB;

isBeforeDate(new Date('2020-10-20'), new Date('2020-10-21')); // true
```

## Date is after another date

Similarly, you can use the greater than operator (`>`) to check if a date comes after another date.

```js
const isAfterDate = (dateA, dateB) => dateA > dateB;

isAfterDate(new Date('2020-10-21'), new Date('2020-10-20')); // true
```

## Date is between two dates

Combining the previous two snippets, you can check if a date is between two other dates.

```js
const isBetweenDates = (dateStart, dateEnd, date) =>
  date > dateStart && date < dateEnd;

isBetweenDates(
  new Date('2020-10-20'),
  new Date('2020-10-30'),
  new Date('2020-10-19')
); // false
isBetweenDates(
  new Date('2020-10-20'),
  new Date('2020-10-30'),
  new Date('2020-10-25')
); // true
```
