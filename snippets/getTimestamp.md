---
title: getTimestamp
tags: date,beginner
---

Gets the Unix timestamp from a `Date` object.

- Use `Date.prototype.getTime()` to get the timestamp in milliseconds and divide by `1000` to get the timestamp in seconds.
- Use `Math.floor()` to appropriately round the resulting timestamp to an integer.
- Omit the argument, `date`, to use the current date.

```js
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
```

```js
getTimestamp(); // 1602162242
```
