---
title: initializeArrayWithValues
tags: array,intermediate
---

Initializes and fills an array with the specified values.

- Use `Array.from()` to create an array of the desired length, `Array.prototype.fill()` to fill it with the desired values.
- Omit the last argument, `val`, to use a default value of `0`.

```js
const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);
```

```js
initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
```
