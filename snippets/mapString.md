---
title: Map string
tags: string,intermediate
firstSeen: 2018-07-14T10:59:56+03:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Creates a new string with the results of calling a provided function on every character in the given string.

- Use `String.prototype.split()` and `Array.prototype.map()` to call the provided function, `fn`, for each character in `str`.
- Use `Array.prototype.join()` to recombine the array of characters into a string.
- The callback function, `fn`, takes three arguments (the current character, the index of the current character and the string `mapString` was called upon).

```js
const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');
```

```js
mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'
```
