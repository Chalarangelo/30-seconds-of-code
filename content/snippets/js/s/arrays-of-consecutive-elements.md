---
title: Generate all consecutive element subarrays from a JavaScript array
shortTitle: Consecutive element subarrays
language: javascript
tags: [array]
cover: camera-zoom
excerpt: Create an array of `n`-tuples of consecutive elements from a given array.
listed: true
dateModified: 2024-03-20
---

Getting a single element from an array is easy, but what if you want to get all possible `n`-tuples of **consecutive elements** from an array? This is a fairly uncommon problem, yet it can be solved with a simple function.

## Arrays of consecutive elements

All you need to do is use `Array.prototype.map()` in order to map each element to an array of `n` consecutive elements, using `Array.prototype.slice()` to extract the subarray. In order to make sure no subarrays with fewer than `n` elements are returned, you can use `Array.prototype.slice()` to remove the first `n - 1` elements.

Finally, you can use `Array.prototype.length` to check if the length of the array is greater than `n` and return an **empty array** if it is not.

```js
const aperture = (n, arr) =>
  n > arr.length
    ? []
    : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));

aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

## Mapped arrays of consecutive elements

Subsequently, if you want to **apply a function** to each of the subarrays, you can simply apply the function to each subarray during the mapping process.

```js
const apertureMap = (arr, n, fn) =>
  n > arr.length
    ? []
    arr.slice(n - 1).map((v, i) => fn(arr.slice(i, i + n)));

apertureMap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, x => x.join('-'));
// ['1-2-3', '2-3-4', '3-4-5', '4-5-6', '5-6-7', '6-7-8', '7-8-9', '8-9-10'];
```
