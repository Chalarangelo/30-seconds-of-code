---
title: Get colon time from date
tags: date,string
expertise: beginner
firstSeen: 2018-01-13T17:14:48+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Returns a string of the form `HH:MM:SS` from a `Date` object.

- Use `Date.prototype.toTimeString()` and `String.prototype.slice()` to get the `HH:MM:SS` part of a given `Date` object.

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
```

```js
getColonTimeFromDate(new Date()); // '08:38:00'
```
