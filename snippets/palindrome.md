---
title: Palindrome
tags: string
cover: blog_images/bridge-drop.jpg
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
---

Checks if the given string is a palindrome.

- Normalize the string to `String.prototype.toLowerCase()` and use `String.prototype.replace()` to remove non-alphanumeric characters from it.
- Use the spread operator (`...`) to split the normalized string into individual characters.
- Use `Array.prototype.reverse()`, `Array.prototype.join()` and compare the result to the normalized string.

```js
const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};
```

```js
palindrome('taco cat'); // true
```
