---
title: toHex
tags: math,intermediate
---

Returns hexadecimal representation of a given decimal number.

- The method `toString()` converts the given number to its string representation.
- This method accepts an optional argument base number which converts the number to the given base (base 16 for hexadecimal).

```js
const toHex = decimal => {
  return decimal.toString(16);
}
```

```js
toHex(500); // "1f4"
```
