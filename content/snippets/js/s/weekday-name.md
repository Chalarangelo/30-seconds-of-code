---
title: Weekday name from a JavaScript Date object
shortTitle: Weekday name
language: javascript
tags: [date]
cover: interior
excerpt: Get the name of the weekday from a JavaScript `Date` object.
listed: true
dateModified: 2024-05-21
---

`Date` objects in JavaScript have a lot of useful methods, even though they often get a bad rap. One of these methods is `Date.prototype.toLocaleDateString()`, which can be used to get the **name of the weekday** from a `Date` object.

## Full weekday name

To get the **full name** of the weekday, you can use the [`{ weekday: 'long' }`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#long) option with `Date.prototype.toLocaleDateString()`. If you want to get the name in a specific language, you can pass a second argument to the following function, specifying the **locale code**.

```js
const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'long' });

dayName(new Date()); // 'Monday'
dayName(new Date('05/27/2024'), 'de-DE'); // 'Montag'
```

## Short weekday name

Similarly, you can get the **short name** of the weekday by using the [`{ weekday: 'short' }`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#short) option. This will return the abbreviated name of the weekday (e.g., `'Mon'`, `'Tue'`, `'Wed'`).

```js
const shortDayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'short' });

shortDayName(new Date()); // 'Mon'
shortDayName(new Date('05/27/2024'), 'de-DE'); // 'Mo'
```

## Single-letter weekday name

If you only need the **first letter** of the weekday name, you can use the [`{ weekday: 'narrow' }`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#narrow) option. Note that this will return the first letter of the weekday name, which **might not be unique** (e.g., `'T'` for both `'Tuesday'` and `'Thursday'`).

```js
const narrowDayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: 'narrow' });

narrowDayName(new Date()); // 'M'
narrowDayName(new Date('05/27/2024'), 'de-DE'); // 'M'
```
