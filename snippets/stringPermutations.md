---
title: String permutations
tags: string,recursion
expertise: advanced
firstSeen: 2018-02-19T15:47:47+02:00
lastUpdated: 2020-11-15T17:13:42+02:00
---

Generates all permutations of a string (contains duplicates).

- Use recursion.
- For each letter in the given string, create all the partial permutations for the rest of its letters.
- Use `Array.prototype.map()` to combine the letter with each partial permutation.
- Use `Array.prototype.reduce()` to combine all permutations in one array.
- Base cases are for `String.prototype.length` equal to `2` or `1`.
- ⚠️ **WARNING**: The execution time increases exponentially with each character. Anything more than 8 to 10 characters will cause your environment to hang as it tries to solve all the different combinations.

```js
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};
```

```js
stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```
