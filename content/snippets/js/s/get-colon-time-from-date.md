---
title: Get colon time from a JavaScript date
shortTitle: Colon time from date
language: javascript
tags: [date,string]
cover: digital-nomad-5
excerpt: Get the time part of a Date object in the format HH:MM:SS.
listed: true
dateModified: 2024-05-30
---

JavaScript's `Date` objects contain a lot of information, including the time. They also include a lot of useful methods for extracting specific parts of the date and time. However, if you want to get the **time part** of a `Date` object in the format `HH:MM:SS`, you might need to do a bit of **string manipulation**.

`Date.prototype.toTimeString()` returns a string representation of the time part of a `Date` object. However, this string also includes the **timezone information**, which you might not need. To get only the time part in the format `HH:MM:SS`, you can use `String.prototype.slice()` to extract the **first 8 characters** of the string.

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // '08:38:00'
```
