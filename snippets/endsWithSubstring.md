---
title: String ends with substring
shortTitle: Ends with substring
tags: string
cover: boutique-home-office-4
author: chalarangelo
firstSeen: 2022-08-01T05:00:00-04:00
---

Checks if a given string ends with a substring of another string.

- Use a `for...in` loop and `String.prototype.slice()` to get each substring of the given `word`, starting at the end.
- Use `String.prototype.endsWith()` to check the current substring against the `text`.
- Return the matching substring, if found. Otherwise, return `undefined`.

```js
const endsWithSubstring = (text, word) => {
  for (let i in word) {
    const substr = word.slice(0, i + 1);
    if (text.endsWith(substr)) return substr;
  }
  return undefined;
};
```

```js
endsWithSubstring('Lorem ipsum dolor sit amet<br /', '<br />'); // '<br /'
```
