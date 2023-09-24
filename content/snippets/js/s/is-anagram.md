---
title: String is anagram
type: snippet
language: javascript
tags: [string,regexp]
cover: new-york
dateModified: 2020-10-20
---

Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).

- Use `String.prototype.toLowerCase()` and `String.prototype.replace()` with an appropriate regular expression to remove unnecessary characters.
- Use `String.prototype.split()`, `Array.prototype.sort()` and `Array.prototype.join()` on both strings to normalize them, then check if their normalized forms are equal.

```js
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};
```

```js
isAnagram('iceman', 'cinema'); // true
```
