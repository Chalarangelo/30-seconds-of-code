---
title: Logical xor
tags: math,logic,beginner
unlisted: true
firstSeen: 2020-10-05T21:19:21+03:00
lastUpdated: 2021-01-04T13:04:15+02:00
---

Checks if only one of the arguments is `true`.

- Use the logical or (`||`), and (`&&`) and not (`!`) operators on the two given values to create the logical xor.

```js
const xor = (a, b) => (( a || b ) && !( a && b ));
```

```js
xor(true, true); // false
xor(true, false); // true
xor(false, true); // true
xor(false, false); // false
```
