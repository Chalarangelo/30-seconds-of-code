---
title: palindrome
tags: string,intermediate
---

Checks if the given string is a palindrome.

- Normalize the string to `String.prototype.toLowerCase()` and use `String.prototype.replace()` to remove non-alphanumeric characters from it.
- Use the spread operator (`...`) to split the normalized string into individual characters.
- Use `Array.prototype.reverse()`, `String.prototype.join('')` and compare the result to the normalized string.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};
```

```js
palindrome('taco cat'); // true
```
