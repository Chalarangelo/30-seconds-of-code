---
title: String starts with substring
shortTitle: Starts with substring
tags: string
expertise: beginner
cover: blog_images/boutique-home-office-3.jpg
author: chalarangelo
firstSeen: 2022-07-31T05:00:00-04:00
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
