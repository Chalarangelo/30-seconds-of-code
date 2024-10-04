---
title: Format a date to ISO string with timezone using JavaScript
shortTitle: Date to ISO format with timezone
language: javascript
tags: [date]
cover: pop-of-green
excerpt: Convert a date to extended ISO format (ISO 8601), including timezone offset.
listed: true
dateModified: 2024-01-07
---

The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard defines a **format for dates and times**. It is widely adopted across the world and has applications in all fields, from business to science.

Dates in the format are represented either as:

- `YYYY-MM-DDTHH:mm:ss.sssZ` (UTC time)
- `YYYY-MM-DDTHH:mm:ss.sss±hh:mm` (local time with timezone offset)

Let's see how we can convert a date to either format using JavaScript.

## Format date to ISO string (UTC time)

JavaScript's built-in `Date.prototype.toISOString()` method converts a date to ISO string in **UTC time**.

```js
const toISOString = date => date.toISOString();

toISOString(
  new Date('2024-01-06T19:20:34+02:00')
); // '2024-01-06T17:20:34.000Z'
```

## Format date to ISO string with timezone offset

In order to include the **timezone offset**, you have to build the string yourself.

For this, you'll need to know the timezone offset of the date, which can be retrieved using `Date.prototype.getTimezoneOffset()`. The returned **values is in minutes**, so you'll have to convert it to hours and minutes. It also returns a negative value for positive offsets, so you'll have to **reverse the sign**.

On top of that, you'll have to manually **pad the values to 2 digits**, using `String.prototype.padStart()`. Using that, in combination with the timezone offset and the built-in methods in `Date`, you can build the ISO 8601 string with timezone offset.

```js
// Pad a number to 2 digits
const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
// Get timezone offset in ISO format (+hh:mm or -hh:mm)
const getTimezoneOffset = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
};

const toISOStringWithTimezone = date => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
};

toISOStringWithTimezone(
  new Date('2024-01-06T19:20:34+02:00')
); // '2024-01-06T19:20:34+02:00'
```

## Check if a string is an ISO formatted date

As often as you might need to convert a date to ISO format, you might also need to check if a string is a valid ISO formatted date. Knowing how to convert a date to ISO format, you can simply **compare the result with the original string**.

Add a check for **invalid dates** with `Number.isNaN()` and a **date conversion**, using the `Date` constructor, and you're ready to.

```js
const isISOString = val => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
};

const isISOStringWithTimezone = val => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && toISOStringWithTimezone(d) === val;
};

isISOString('2020-10-12T10:10:10.000Z'); // true
isISOString('2020-10-12'); // false
isISOStringWithTimezone('2020-10-12T10:10:10+02:00'); // true
isISOStringWithTimezone('2020-10-12T10:10:10.000Z'); // false
```
