---
title: monthName
tags: date,beginner
---

Gets the name of the month from a `Date` object, optionally for a given language.

- Use `new Date()` or `new Date('mm/dd/yyyy')` to find the month.
- Use `Date.prototype.toLocaleDateString()` with the `{ month: 'long' }` option to retrieve the month.
- Use the optional second parameter for language specific name. If not used, returns the default locale.

```js
const monthName = ( date, locale ) =>
  date.toLocaleDateString(locale, { month: 'long' })
```

```js
monthName(new Date()); // 'October'
monthName(new Date('06/18/2019'), 'ml-IN'); // 'ജൂൺ'
```
