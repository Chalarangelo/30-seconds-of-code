---
title: isNegativeZero
tags: math,intermediate
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
