---
title: Check if a value is a valid JavaScript date
shortTitle: Check if date is valid
language: javascript
tags: [date]
cover: cave-explorer
excerpt: Learn how you can check if a valid date object can be created from the given values.
listed: true
dateModified: 2024-07-22
---

JavaScript provides a `Date` object that represents a single moment in time. It can be created using **various formats**, such as a string, an array of values, or individual values for the year, month, day, etc. However, not all values can be used to create a valid `Date` object.

So, how can you check if a **value or set of values** can be used to create a valid `Date` object? The simplest way is to use the `Date()` constructor with any value we want to check. Then, using `Date.prototype.valueOf()` and `Number.isNaN()`, we can determine if a valid `Date` object can be created.

In order to create a robust method, we can use the spread operator (`...`) to pass the values to the `Date()` constructor. This way, we can check if a valid `Date` object can be created from **any number of values** (e.g. a single string, a set of numeric values etc.).

```js
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid('December 17, 1995 03:24:00'); // true
isDateValid('1995-12-17T03:24:00'); // true
isDateValid('1995-12-17 T03:24:00'); // false
isDateValid('Duck'); // false
isDateValid(1995, 11, 17); // true
isDateValid(1995, 11, 17, 'Duck'); // false
isDateValid({}); // false
```
