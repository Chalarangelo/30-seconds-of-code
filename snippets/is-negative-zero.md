---
title: Number is negative zero
tags: math
cover: flower-portrait-8
firstSeen: 2018-11-12T15:45:36+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the given value is equal to negative zero (`-0`).

- Check whether a passed value is equal to `0` and if `1` divided by the value equals `-Infinity`.

```js
const isNegativeZero = val => val === 0 && 1 / val === -Infinity;
```

```js
isNegativeZero(-0); // true
isNegativeZero(0); // false
```
