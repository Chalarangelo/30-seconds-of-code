---
title: reverseNumber
tags: number,array,beginner
---

Reverses a number.
Use `Object.prototype.toString()` to convert number to a string.
Use the split function `String.prototype.split()` to convert string to array and `Array.prototype.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `String.prototype.join('')`.
Use the `parseFloat()` to convert string to a number and use `Math.sign()` to preserve the signum value of the number.
_Note_: Here `parseFloat()` is used instead of `parseInt()` so floating point numbers are properly handled.

```js
const reverseNumber = n => {
  const reveresedNumber = n.toString().split('').reverse().join('');
  return parseFloat(reveresedNumber) * Math.sign(n);
}
```

```js
reverseNumber(981); // 189
reverseNumber(-500); // -5
reverseNumber(73.6); // 6.37
reverseNumber(-5.23); // -32.5
```