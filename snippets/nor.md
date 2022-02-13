---
title: Logical nor
tags: math,logic,beginner
unlisted: true
firstSeen: 2021-03-29T21:20:41+03:00
lastUpdated: 2021-04-02T16:47:15+03:00
---

Checks if none of the arguments are `true`.

- Use the logical not (`!`) operator to return the inverse of the logical or (`||`) of the two given values.

```js
const nor = (a, b) => !(a||b);
```

```js
nor(true, true); // false
nor(true, false); // false
nor(false, false); // true
```
