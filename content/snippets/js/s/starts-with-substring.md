---
title: String starts with substring
type: snippet
shortTitle: Starts with substring
language: javascript
tags: [string]
cover: boutique-home-office-3
dateModified: 2022-07-31
---

Checks if a given string starts with a substring of another string.

- Use a `for...in` loop and `String.prototype.slice()` to get each substring of the given `word`, starting at the beginning.
- Use `String.prototype.startsWith()` to check the current substring against the `text`.
- Return the matching substring, if found. Otherwise, return `undefined`.

```js
const startsWithSubstring = (text, word) => {
  for (let i in word) {
    const substr = word.slice(-i - 1);
    if (text.startsWith(substr)) return substr;
  }
  return undefined;
};
```

```js
startsWithSubstring('/>Lorem ipsum dolor sit amet', '<br />'); // '/>'
```
