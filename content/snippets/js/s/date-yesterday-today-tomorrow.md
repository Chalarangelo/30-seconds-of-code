---
title: Date of yesterday, today or tomorrow in JavaScript
shortTitle: Date of yesterday, today or tomorrow
language: javascript
tags: [date]
cover: travel-mug-2
excerpt: Easily calculate the date of yesterday, today or tomorrow in JavaScript.
listed: true
dateModified: 2024-01-06
---

In a previous post, we've covered `Date` object manipulation and, most importantly, [how to add days to a date](/js/s/add-minutes-hours-days-to-date#add-days-to-date). This time around, we'll take a look at how to calculate the date of yesterday, today and tomorrow, using the same technique.

## Date of today

The current date is the easiest to calculate. We can simply use the `Date` constructor to get the current date.

```js
const today = () => new Date();

today().toISOString().split('T')[0];
// 2018-10-18 (if current date is 2018-10-18)
```

## Date of yesterday

To calculate the date of yesterday, we simply need to **decrement the current date by one**. To do this, we will use `Date.prototype.getDate()` and `Date.prototype.setDate()` to get and set the date, respectively.

```js
const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

yesterday().toISOString().split('T')[0];
// 2018-10-17 (if current date is 2018-10-18)
```

## Date of tomorrow

To calculate the date of tomorrow, we simply need to **increment the current date by one**, instead of decrementing it.

```js
const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
};

tomorrow().toISOString().split('T')[0];
// 2018-10-19 (if current date is 2018-10-18)
```
