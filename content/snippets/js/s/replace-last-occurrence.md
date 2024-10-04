---
title: Replace the last occurrence of a pattern in a JavaScript string
shortTitle: Replace last occurrence
language: javascript
tags: [string,regexp]
cover: waves
excerpt: Learn how to use regular expressions to replace the last occurrence of a pattern in a JavaScript string.
listed: true
dateModified: 2024-02-08
---

Replacing the first occurrence of a pattern in a string is easy, but what if you want to replace the **last occurrence**? This, admittedly, is a little trickier, especially if you want to match the functionality of `String.prototype.replace()`.

First and foremost, we need to determine if the `pattern` is a **string or a regular expression**. If it's a string, we can use it as the `match`.

If it's a regular expression, we need to create a new regular expression using the `RegExp()` constructor and the `RegExp.prototype.source` of the `pattern`, adding the `'g'` flag to it. Using `String.prototype.match()` and `Array.prototype.slice()`, we can then get the last match, if any.

We can then use `String.prototype.lastIndexOf()` to find the last occurrence of the match in the string. If **a match is found**, we can use `String.prototype.slice()` and a template literal to **replace the matching substring** with the given `replacement`. If **no match is found**, we can simply return the original string.

Putting everything together results in a versatile implementation that can handle both strings and regular expressions, and that matches the functionality of `String.prototype.replace()`:

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

replaceLast('abcabdef', 'ab', 'gg'); // 'abcggdef'
replaceLast('abcabdef', /ab/, 'gg'); // 'abcggdef'
replaceLast('abcabdef', 'ad', 'gg'); // 'abcabdef'
replaceLast('abcabdef', /ad/, 'gg'); // 'abcabdef'
```
