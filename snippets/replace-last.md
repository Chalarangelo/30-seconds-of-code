---
title: Replace last occurrence in string
type: snippet
tags: [string,regexp]
author: chalarangelo
cover: waves
dateModified: 2021-04-22T09:01:22+03:00
---

Replaces the last occurrence of a pattern in a string.

- Use `typeof` to determine if `pattern` is a string or a regular expression.
- If the `pattern` is a string, use it as the `match`.
- Otherwise, use the `RegExp` constructor to create a new regular expression using the `RegExp.prototype.source` of the `pattern` and adding the `'g'` flag to it. Use `String.prototype.match()` and `Array.prototype.slice()` to get the last match, if any.
- Use `String.prototype.lastIndexOf()` to find the last occurrence of the match in the string.
- If a match is found, use `String.prototype.slice()` and a template literal to replace the matching substring with the given `replacement`.
- If no match is found, return the original string.

```js
const replaceLast = (str, pattern, replacement) => {
  const match =
    typeof pattern === 'string'
      ? pattern
      : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
  if (!match) return str;
  const last = str.lastIndexOf(match);
  return last !== -1
    ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
    : str;
};
```

```js
replaceLast('abcabdef', 'ab', 'gg'); // 'abcggdef'
replaceLast('abcabdef', /ab/, 'gg'); // 'abcggdef'
replaceLast('abcabdef', 'ad', 'gg'); // 'abcabdef'
replaceLast('abcabdef', /ad/, 'gg'); // 'abcabdef'
```
