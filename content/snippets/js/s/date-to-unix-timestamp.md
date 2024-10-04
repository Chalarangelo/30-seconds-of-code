---
title: Convert between a JavaScript Date object and a Unix timestamp
shortTitle: Date to Unix timestamp
language: javascript
tags: [date]
cover: number-2
excerpt: Easily convert between a JavaScript Date object and a Unix timestamp.
listed: true
dateModified: 2024-01-07
---

Unix timestamps are a **number representing the number of seconds** since the Unix epoch (_January 1, 1970, 00:00:00 UTC_). JavaScript `Date` objects are a **number representing the number of milliseconds** since the Unix epoch.

This means that you can convert between `Date` objects and Unix timestamps by dividing or multiplying by `1000`.

```js
const toTimestamp = date => Math.floor(date.getTime() / 1000);
const fromTimestamp = timestamp => new Date(timestamp * 1000);

toTimestamp(new Date('2024-01-04')); // 1704326400
fromTimestamp(1704326400); // 2024-01-04T00:00:00.000Z
```
