---
title: Find all indexes of a substring in a JavaScript string
shortTitle: All indexes of substring
language: javascript
tags: [string,generator]
cover: armchair-in-yellow
excerpt: Create a generator function that finds all the indexes of a substring in a given string.
listed: true
dateModified: 2024-03-10
---

Finding the index of a substring in a string can be easily accomplished using `String.prototype.indexOf()`. However, if you want to check for **all occurrences of a substring**, there's no built-in method to do so. Yet, it's fairly easy to do so yourself.

In order to find all indexes of a substring, I find it useful to create a **generator function**. This provides a little more flexibility and might be more efficient in some cases.

As mentioned already, `String.prototype.indexOf()` only returns the **first occurrence** of a substring, but it can be passed a second argument, `fromIndex`, which specifies the **index at which to start the search**. Combining this with a `while` loop, we can find occurrences of a substring in a string as long as there are any (the method returns `-1` when **no occurrence** is found).

As long as an occurrence is found, we can use `yield` to return the index and update the `fromIndex` to continue the search. If no occurrence is found, we can use `return` to terminate the generator.

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

[...indexOfSubstrings('tiktok tok tok tik tok tik', 'tik')]; // [0, 15, 23]
[...indexOfSubstrings('tutut tut tut', 'tut')]; // [0, 2, 6, 10]
[...indexOfSubstrings('hello', 'hi')]; // []
```
