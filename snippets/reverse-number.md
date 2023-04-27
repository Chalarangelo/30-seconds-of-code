---
title: Reverse number
tags: math,string
cover: walking
firstSeen: 2020-07-17T16:41:28+03:00
lastUpdated: 2020-09-18T21:19:23+03:00
---

Reverses a number.

- Use `Object.prototype.toString()` to convert `n` to a string.
- Use `String.prototype.split()`, `Array.prototype.reverse()` and `Array.prototype.join()` to get the reversed value of `n` as a string.
- Use `parseFloat()` to convert the string to a number and `Math.sign()` to preserve its sign.

```js
const reverseNumber = n =>
  parseFloat(`${n}`.split('').reverse().join('')) * Math.sign(n);
```

```js
reverseNumber(981); // 189
reverseNumber(-500); // -5
reverseNumber(73.6); // 6.37
reverseNumber(-5.23); // -32.5
```
