---
title: functionName
tags: date,beginner
---

Gets the Unix timestamp from a `Date` object

- Use `new Date()` to get the Date object and `Date.prototype.getTime()` to get the timestamp in milliseconds and divide by 1000 to get the timestamp in seconds.
- Use `Math.floor()` to appropriately round the resulting timestamp to an integer.

```js
const getTimestamp = date =>
  Math.floor(date.getTime()/1000);
```

```js
getTimestamp(new Date()); // 1602162242
```