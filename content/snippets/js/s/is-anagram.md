---
title: Check if a JavaScript string is an anagram of another string
shortTitle: String anagram
language: javascript
tags: [string,regexp]
cover: new-york
excerpt: Check if a string is an anagram of another string, handling case-insensitivity and special characters.
listed: true
dateModified: 2024-08-11
---

An anagram of a string is another string that **contains the same characters, only in a different order**. It's common to also ignore case, spaces, punctuation, and special characters when checking for anagrams.

The simplest way to compare two strings for anagrams is to **normalize** them by removing unnecessary characters and sorting them. This way, you can easily compare the normalized strings to see if they are equal.

Implementing this in JavaScript means using `String.prototype.toLowerCase()` and `String.prototype.replace()` with an appropriate **regular expression** to remove unnecessary characters. Then, you can use `String.prototype.split()`, `Array.prototype.sort()`, and `Array.prototype.join()` to normalize both strings and check if their normalized forms are equal.

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

isAnagram('iceman', 'cinema'); // true
```
