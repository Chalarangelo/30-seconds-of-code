---
title: toSafeInteger
tags: math,beginner
firstSeen: 2018-01-08T17:12:46+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Converts a value to a safe integer.

- Use `Math.max()` and `Math.min()` to find the closest safe value.
- Use `Math.round()` to convert to an integer.

```js
const toSafeInteger = num =>
  Math.round(
    Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
  );
```

```js
toSafeInteger('3.2'); // 3
toSafeInteger(Infinity); // 9007199254740991
```
