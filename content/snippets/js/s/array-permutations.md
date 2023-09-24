---
title: Array permutations
type: snippet
language: javascript
tags: [array,algorithm,recursion]
cover: body-of-water
dateModified: 2020-12-28
---

Generates all permutations of an array's elements (contains duplicates).

- Use recursion.
- For each element in the given array, create all the partial permutations for the rest of its elements.
- Use `Array.prototype.map()` to combine the element with each partial permutation, then `Array.prototype.reduce()` to combine all permutations in one array.
- Base cases are for `Array.prototype.length` equal to `2` or `1`.
- ⚠️ **WARNING**: This function's execution time increases exponentially with each array element. Anything more than 8 to 10 entries may cause your browser to hang as it tries to solve all the different combinations.

```js
const permutations = arr => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val,
        ])
      ),
    []
  );
};
```

```js
permutations([1, 33, 5]);
// [ [1, 33, 5], [1, 5, 33], [33, 1, 5], [33, 5, 1], [5, 1, 33], [5, 33, 1] ]
```
