---
title: Reverse number
type: snippet
language: javascript
tags: [math,string]
cover: book-stopper
dateModified: 2020-09-18
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
