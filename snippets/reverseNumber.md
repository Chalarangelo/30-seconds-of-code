---
title: reverseNumber
tags: number,array,beginner
---

Reverses a number.
Use `Object.prototype.toString()` to convert number to a string.
Use the split function `String.prototype.split()` to convert string to array and `Array.prototype.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `String.prototype.join('')`.
Use the `parseInt()` to convert string to a number and use `Math.sign()` to preserve the signum value of the number.

```js
const reverseNumber = n => {
  const reveresedNumber = n.toString().split('').reverse();
  return parseInt(reveresedNumber) * Math.sign(n);
}
```

```js
reverseNumber(981); // 189
reverseNumber(-500); // -5
```