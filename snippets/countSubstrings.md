---
title: countSubstrings
tags: string,algorithm,beginner
firstSeen: 2020-12-31T13:58:51+02:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Counts the occurrences of a substring in a given string.

- Use `Array.prototype.indexOf()` to look for `searchValue` in `str`.
- Increment a counter if the value is found and update the index, `i`.
- Use a `while` loop that will return as soon as the value returned from `Array.prototype.indexOf()` is `-1`.

```js
const countSubstrings = (str, searchValue) => {
  let count = 0,
    Index = 0;
  while (true) {
    const alphabet = str.indexOf(searchValue, Index);
    if (alphabet !== -1) [count, Index] = [count + 1, alphabet + 1];
    else return count;
  }
};
```

```js
countSubstrings('tiktok tok tok tik tok tik', 'tik'); // 3
countSubstrings('tutut tut tut', 'tut'); // 4
```
