---
title: stringRotation
tags: string,regexp,array,intermediate
---

Checks if a string is a rotation of another string (case-insensitive, ignores spaces, punctuation and special characters).

- Use `String.prototype.toLowerCase()`, `String.prototype.replace()` with an appropriate regular expression to remove unnecessary characters and normalize them, then check if the normalized strings are equal in length.
- Use `Array.prototype.concat()` to create a new string which is the first string concatenated to itself, then check if the second string is included in the new string using `Array.prototype.includes()`.

```js
const stringRotation = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '');
  str1 = normalize(str1);
  str2 = normalize(str2);
  if (str1.length !== str2.length) return false;
  const str3 = str1.concat(str1);
  if (str3.includes(str1)) return true;
  return false;
};
```

```js
stringRotation('sampleInput', 'Inputsample'); // 'true'
```