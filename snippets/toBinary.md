---
title: toBinary
tags: math,intermediate
---

Returns binary representation of a given decimal number.

- The method `toString()` converts the given number to its string representation.
- This method accepts an optional argument base number which converts the number to the given base (base 2 for binary).

```js
const toBinary = decimal => {
  return decimal.toString(2);
}
```

```js
toBinary(40); // "101000"
```
