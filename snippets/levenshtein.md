---
title: levenshtein
tags: array,function,math,advanced
---

The [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) describes the edit distance between two strings.
Or in other words: how many operations (inserting, deleting or substituting a single letter) are needed to get from word A to word B.
The lower the distance, the more equal the words. A common use case is to find the closest alternative for mistyped words.

- Create a two-dimensional array, where one dimension represents word A and the other one word B.
- Calculate the distances from sub-words of A to sub-words of B.
- If both A and B have the same letter at a certain position in the matrix, re-use the same distance from before this letter.
- Otherwise, use the minimum distance of one of the three possible operations.
- Use `Array.from()` to create a pre-sized array.
- Use `String.prototype.charAt` to get the nth character of a string, with a character offset starting at 0.
- Use `Math.min()` to calculate the minimum distance of the three operations.

```js
const levenshtein = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, () => Array.from({ length: b.length + 1 }));
  for (let y = 0; y <= a.length; y++) {
    for (let x = 0; x <= b.length; x++) {
      if (y === 0) {
        matrix[y][x] = x;
      } else if (x === 0) {
        matrix[y][x] = y;
      } else if (a.charAt(y-1) === b.charAt(x-1)) {
        matrix[y][x] = matrix[y-1][x-1];
      } else {
        matrix[y][x] = Math.min(matrix[y-1][x-1] + 1, matrix[y][x-1] + 1, matrix[y-1][x] + 1);
      }
    }
  }
  return matrix[a.length][b.length];
};
```

```js
levenshtein('book', 'back');      // 2 (replace o => a, replace o => c)
levenshtein('sitting', 'kitten'); // 3 (replace s => k, replace i => e, delete g)

// find closest word
const mistyped = 'bannanna';
const alternative = ['apple', 'kiwi', 'cherry', 'orange', 'banana', 'strawberry', 'melon']
  .reduce((closest, current) => levenshtein(mistyped, current) < levenshtein(mistyped, closest) ? current : closest);

console.log(`did you mean "${alternative}"?`) // 'did you mean "banana"?'
```
