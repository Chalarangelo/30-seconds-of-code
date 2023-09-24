---
title: Right substring generator
type: snippet
language: javascript
tags: [string,generator]
cover: boutique-home-office-2
author: chalarangelo
dateModified: 2022-07-25
---

Generates all right substrings of a given string.

- Use `String.prototype.length` to terminate early if the string is empty.
- Use a `for...in` loop and `String.prototype.slice()` to `yield` each substring of the given string, starting at the end.

```js
const rightSubstrGenerator = function* (str) {
  if (!str.length) return;
  for (let i in str) yield str.slice(-i - 1);
};
```

```js
[...rightSubstrGenerator('hello')];
// [ 'o', 'lo', 'llo', 'ello', 'hello' ]
```
