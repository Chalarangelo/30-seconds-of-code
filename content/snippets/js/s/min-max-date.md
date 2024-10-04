---
title: Find the minimum or maximum date using JavaScript
shortTitle: Min or max date
language: javascript
tags: [date]
cover: interior-2
excerpt: Quickly find the minimum or maximum date in an array of dates.
listed: true
dateModified: 2024-01-06
---

At a fundamental level, JavaScript `Date` objects are **just numbers representing a timestamp**. This means that, much like any other number, you can compare them and perform mathematical operations on them.

Based on this observation, we can use the `Math.min()` and `Math.max()` methods to find the minimum or maximum date in an array of dates. As these functions take an arbitrary number of arguments, we can use the spread operator (`...`) to pass the dates as individual arguments.

```js
const minDate = (...dates) => new Date(Math.min(...dates));
const maxDate = (...dates) => new Date(Math.max(...dates));

const dates = [
  new Date('2017-05-13'),
  new Date('2018-03-12'),
  new Date('2016-01-10'),
  new Date('2016-01-09')
];
minDate(...dates); // 2016-01-09
maxDate(...dates); // 2018-03-12
```
