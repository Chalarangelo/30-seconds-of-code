---
title: Date from Unix timestamp
type: snippet
language: javascript
tags: [date]
cover: number-2
dateModified: 2020-10-15
---

Creates a `Date` object from a Unix timestamp.

- Convert the timestamp to milliseconds by multiplying with `1000`.
- Use the `Date` constructor to create a new `Date` object.

```js
const fromTimestamp = timestamp => new Date(timestamp * 1000);
```

```js
fromTimestamp(1602162242); // 2020-10-08T13:04:02.000Z
```
