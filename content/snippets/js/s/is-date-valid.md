---
title: Check if date is valid
type: snippet
language: javascript
tags: [date]
cover: cave-explorer
dateModified: 2020-10-20
---

Checks if a valid date object can be created from the given values.

- Use the spread operator (`...`) to pass the array of arguments to the `Date` constructor.
- Use `Date.prototype.valueOf()` and `Number.isNaN()` to check if a valid `Date` object can be created from the given values.

```js
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());
```

```js
isDateValid('December 17, 1995 03:24:00'); // true
isDateValid('1995-12-17T03:24:00'); // true
isDateValid('1995-12-17 T03:24:00'); // false
isDateValid('Duck'); // false
isDateValid(1995, 11, 17); // true
isDateValid(1995, 11, 17, 'Duck'); // false
isDateValid({}); // false
```
