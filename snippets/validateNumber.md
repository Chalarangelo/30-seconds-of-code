---
title: Validate number
tags: math,intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:23:26+03:00
---

Checks if the given value is a number.

- Use `parseFloat()` to try to convert `n` to a number.
- Use `Number.isNaN()` and logical not (`!`) operator to check if `num` is a number.
- Use `Number.isFinite()` to check if `num` is finite.
- Use `Number()` and the loose equality operator (`==`) to check if the coercion holds.

```js
const validateNumber = n => {
  const num = parseFloat(n);
  return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
}
```

```js
validateNumber('10'); // true
validateNumber('a'); // false
```
