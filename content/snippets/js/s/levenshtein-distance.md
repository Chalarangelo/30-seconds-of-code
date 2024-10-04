---
title: Calculate the Levenshtein distance between two strings in JavaScript
shortTitle: Levenshtein distance
language: javascript
tags: [string,algorithm]
cover: purple-sunset-waves
excerpt: Implement the Levenshtein distance algorithm in JavaScript to calculate the difference between two strings.
listed: true
dateModified: 2023-12-28
---

## Definition

The [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) is a **measure of the difference between two strings**. It is defined as the **minimum number of single-character edits** (insertions, deletions or substitutions) required to change one string into the other. It is also sometimes referred to as _edit distance_, although that may also refer to different distance metrics.

## Implementation

The following implementation is based on the [Wagner–Fischer algorithm](https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm). It uses a 2D array to store the distances between all prefixes of the two strings. The last element of the last row of the array contains the Levenshtein distance between the two strings.

1. Start by checking the `length` of each string. If either of them is **zero**, return the `length` of the other one.
2. Create an empty **2D array**. Use a `for` loop to iterate over the letters of the target string and a nested `for` loop to iterate over the letters of the source string.
3. Calculate the **cost of substitution** for the letters corresponding to `i - 1` and `j - 1` in the target and source respectively (`0` if they are the same, `1` otherwise).
4. Use `Math.min()` to **populate each element in the 2D array** with the minimum of the cell above incremented by one, the cell to the left incremented by one or the cell to the top left incremented by the previously calculated cost.
5. Return the **last element of the last row** of the produced array. This is the Levenshtein distance between the two strings.

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

levenshteinDistance('duck', 'dark'); // 2
levenshteinDistance('foo', 'foobar'); // 3
```

## Complexity

The **time complexity** of this algorithm is `O(mn)`, where `m` and `n` are the lengths of the two strings. The **space complexity** is `O(mn)` as well, since we are creating a 2D array of that size.

A possible **modification** to reduce the space complexity to `O(min(m, n))` is possible, using two arrays of length `min(m, n) + 1` instead of a 2D array. This is based on the fact that the algorithm only needs to keep track of the previous row of the 2D array at any given time.
