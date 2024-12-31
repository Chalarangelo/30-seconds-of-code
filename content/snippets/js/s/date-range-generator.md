---
title: Date range generator in JavaScript
shortTitle: Date range generator
language: javascript
tags: [date,function,generator]
cover: portal-timelapse
excerpt: Create a generator that generates all dates in a given range.
listed: true
dateModified: 2024-07-31
---

Generating a range of `Date` values is very common when working with any type of data that involves dates. Luckily, ES6 introduced **generators**, which can be used to create a generator function that yields all dates in a given range, allowing us to save memory and time.

> [!NOTE]
>
> If you're **not familiar with generator functions**, be sure to read the [range generator article](/js/s/range-generator) first.

As mentioned in [a previous post](/js/s/date-yesterday-today-tomorrow), we can manipulate `Date` objects using `Date.prototype.getDate()` and `Date.prototype.setDate()`. This allows us to easily **increment or decrement dates**.

Knowing that, we can construct a generator function that uses a `for` **loop** to iterate over the dates in the given range, incrementing by a specified step, allowing us to `yield` each date in the range.

```js
const dateRange = function* (start, end, step = 1) {
  for (
    let d = new Date(start);
    d < new Date(end);
    d.setDate(d.getDate() + step)
  )
    yield new Date(d);
};

[...dateRange('2021-06-01','2021-06-04')];
// [ 2021-06-01, 2021-06-02, 2021-06-03 ]
```
