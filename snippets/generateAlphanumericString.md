---
title: generateAlphanumericString
tags: array,intermediate
---

Generates an alphanumeric string for a given length

- `Math.random()` function returns a number between 0 (inclusive) and 1 (exclusive).
- `Number.prototype.toString()` method returns a string. It accepts an integer called _radix_ in the range `2` through `36` which specifies the base for representing numerical values.
- `String.prototype.substr()` method retuns a portion of a string. In other words, it extracts _length_ characters from a string counting from `start` index. If `start` index is negative, it starts counting from the end of the string.

```js
const alphanumericString = (length) => (length) =>
  Math.random().toString(36).substr(-length);
```

```js
alphanumericString(8); // '1esk6tka'
alphanumericString(5); // 'sp5ns'
```
