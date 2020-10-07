---
title: palindrome
tags: string,number,intermediate
---

Returns `true` if the given string or number is a palindrome, `false` otherwise.

- Convert the string or number to `String.prototype.toString()` in order to cast number to string, `String.prototype.toLowerCase()` and use `String.prototype.replace()` to remove non-alphanumeric characters from it.
- Then, use the spread operator (`...`) to split the string into individual characters, `Array.prototype.reverse()`, `String.prototype.join('')` and compare it to the original, unreversed string, after converting it to `String.prototype.toLowerCase()`.

```js
const palindrome = input => {
  const s = input.toString().toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};
```

```js
palindrome('taco cat'); // true
palindrome(2002); // true
```