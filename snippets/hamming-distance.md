---
title: Hamming distance
type: snippet
tags: [math,algorithm]
cover: colorful-lounge
dateModified: 2020-12-28T13:49:24+02:00
---

Calculates the Hamming distance between two values.

- Use the XOR operator (`^`) to find the bit difference between the two numbers.
- Convert to a binary string using `Number.prototype.toString()`.
- Count and return the number of `1`s in the string, using `String.prototype.match()`.

```js
const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;
```

```js
hammingDistance(2, 3); // 1
```
