---
title: Swapcase string
type: snippet
language: javascript
tags: [string]
cover: mountain-lake-2
dateModified: 2020-11-15
---

Creates a string with uppercase characters converted to lowercase and vice versa.

- Use the spread operator (`...`) to convert `str` into an array of characters.
- Use `String.prototype.toLowerCase()` and `String.prototype.toUpperCase()` to convert lowercase characters to uppercase and vice versa.
- Use `Array.prototype.map()` to apply the transformation to each character, `Array.prototype.join()` to combine back into a string.
- Note that it is not necessarily true that `swapCase(swapCase(str)) === str`.

```js
const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');
```

```js
swapCase('Hello world!'); // 'hELLO WORLD!'
```
