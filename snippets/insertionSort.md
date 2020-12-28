---
title: insertionSort
tags: algorithm,array,intermediate
---

Sorts an array of numbers, using the insertion sort algorithm.

- Use `Array.prototype.reduce()` to iterate over all the elements in the given array.
- If the `length` of the accumulator is `0`, add the current element to it.
- Use `Array.prototype.some()` to iterate over the results in the accumulator until the correct position is found.
- Use `Array.prototype.splice()` to insert the current element into the accumulator.

```js
const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);
```

```js
insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```
