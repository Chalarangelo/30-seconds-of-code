---
title: Value is nil
tags: type
cover: river-houses
firstSeen: 2018-01-16T16:50:21+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the specified value is `null` or `undefined`.

- Use the strict equality operator to check if the value of `val` is equal to `null` or `undefined`.

```js
const isNil = val => val === undefined || val === null;
```

```js
isNil(null); // true
isNil(undefined); // true
isNil(''); // false
```
