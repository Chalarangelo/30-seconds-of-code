---
title: Levenshtein distance
tags: string,algorithm
expertise: intermediate
author: chalarangelo
firstSeen: 2020-12-27T19:49:12+02:00
lastUpdated: 2020-12-29T16:27:50+02:00
---

Calculates the difference between two strings, using the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm.

- If either of the two strings has a `length` of zero, return the `length` of the other one.
- Use a `for` loop to iterate over the letters of the target string and a nested `for` loop to iterate over the letters of the source string.
- Calculate the cost of substituting the letters corresponding to `i - 1` and `j - 1` in the target and source respectively (`0` if they are the same, `1` otherwise).
- Use `Math.min()` to populate each element in the 2D array with the minimum of the cell above incremented by one, the cell to the left incremented by one or the cell to the top left incremented by the previously calculated cost.
- Return the last element of the last row of the produced array.

```js
const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};
```

```js
levenshteinDistance('duck', 'dark'); // 2
```
