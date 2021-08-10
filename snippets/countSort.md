---
title: countSort
tags: algorithm, array, intermediate
firstSeen: 2021-08-10T17:17:23+09:00
---

Sorts an array of numbers, using the countsort algorithm.

- Uses Iteration.
- Can only be used when the array only contains positive integers.
- If the array is shorter than the length of 2, return the array.
- Make an array for the output and a counter array to count each element in the input array.
- Update the counter array using `Array.prototype.forEach()`
- Accumulatively add each element in the counter using `Array.prototype.forEach()`.
- Reversely iterate the input array using:
  - `Array.prototype.slice()`
  - `Array.prototype.reverse()`
  - `Array.prototype.forEach()`
  - Each input element gets placed on the new array at the index of which the accumulated counter array gives at the input index, since the counter array shows where the input element needs to be placed among other input elements.
- Return the sorted array.

```js
const countSort = (arr) => {
  if (arr.length < 2) return arr;
  const newArr = new Array(arr.length);
  let count = new Array(Math.max(...arr) + 1).fill(0);
  arr.forEach((e) => ++count[e]);
  count.forEach((e, i) => (count[i + 1] += e));
  arr
    .slice()
    .reverse()
    .forEach((e) => (newArr[--count[e]] = e));
  return newArr;
};
```

```js
countSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```
