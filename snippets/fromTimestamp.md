---
title: fromTimestamp
tags: date,beginner
firstSeen: 2020-10-15T21:57:17+03:00
lastUpdated: 2020-10-15T21:57:17+03:00
---

Creates a `Date` object from a Unix timestamp.

- Convert the timestamp to milliseconds by multiplying with `1000`.
- Use `new Date()` to create a new `Date` object.

```js
const fromTimestamp = timestamp => new Date(timestamp * 1000);
```

```js
fromTimestamp(1602162242); // 2020-10-08T13:04:02.000Z
```
