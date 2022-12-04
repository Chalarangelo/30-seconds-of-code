---
title: String is anagram
tags: string,regexp
cover: blog_images/new-york.jpg
firstSeen: 2018-02-19T15:47:47+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
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
