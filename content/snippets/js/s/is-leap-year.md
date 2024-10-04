---
title: Check if a year is a leap year in JavaScript
shortTitle: Leap year check
language: javascript
tags: [date]
cover: flowering-hills
excerpt: Having a hard time wrapping your head around the math involved in checking for leap years? You might not need to!
listed: true
dateModified: 2024-05-26
---

A [leap year](https://en.wikipedia.org/wiki/Leap_year) is a year that is evenly divisible by 4, except for end-of-century years, which must be divisible by 400.

While detecting a leap year via code sounds like a lot of work, there's a method that **doesn't really involve any math** whatsoever. Using the `Date` object, you can easily check if a given year is a leap year.

All you have to do is use the `Date()` constructor to create an object for **February 29th of the given year**. If the month is February, then `Date.prototye.getMonth()` will return `1` (since months are zero-based in JavaScript), meaning it's a **leap year**. If the month is not February, the date will be set to March 1st, which means it's **not a leap year**.

```js
const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;

isLeapYear(2019); // false
isLeapYear(2020); // true
```
