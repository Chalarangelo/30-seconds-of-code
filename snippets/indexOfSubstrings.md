---
title: indexOfSubstrings
tags: string,algorithm,generator,intermediate
---

Finds all the indexes of a substring in a given string.

- Use `Array.prototype.indexOf()` to look for `searchValue` in `str`.
- Use `yield` to return the index if the value is found and update the index, `i`.
- Use a `while` loop that will terminate the generator as soon as the value returned from `Array.prototype.indexOf()` is `-1`.

```js
const indexOfSubstrings = function* (str, searchValue) {
  let i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) {
      yield r;
      i = r + 1;
    } else return;
  }
};
```

```js
[...indexOfSubstrings('tiktok tok tok tik tok tik', 'tik')]; // [0, 15, 23]
[...indexOfSubstrings('tutut tut tut', 'tut')]; // [0, 2, 6, 10]
[...indexOfSubstrings('hello', 'hi')]; // []
```
