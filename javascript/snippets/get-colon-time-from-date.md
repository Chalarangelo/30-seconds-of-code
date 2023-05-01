---
title: Get colon time from date
type: snippet
tags: [date,string]
cover: digital-nomad-5
dateModified: 2020-10-19T22:49:51+03:00
---

Returns a string of the form `HH:MM:SS` from a `Date` object.

- Use `Date.prototype.toTimeString()` and `String.prototype.slice()` to get the `HH:MM:SS` part of a given `Date` object.

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
```

```js
getColonTimeFromDate(new Date()); // '08:38:00'
```
