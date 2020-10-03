---
title: dayName
tags: date,beginner
---

Gets the name of the weekday from a `Date` object, optionally for a given locale.

- Use `new Date()` or `new Date('mm/dd/yyyy')` to find the weekday.
- Use `Date.prototype.toLocaleDateString()` with the `{ weekday: 'long' }` option to retrieve the weekday.
- Use the optional second parameter for language specific name. If not used, returns the default locale.

```js
const dayName = ( date, locale ) =>
  date.toLocaleDateString(locale, { weekday: 'long' })
```

```js
dayName(new Date()); // 'Saturday'
dayName(new Date('09/23/2020'), 'de-DE'); // 'Samstag'
```
