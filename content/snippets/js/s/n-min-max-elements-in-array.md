---
title: Find the n min or max elements in a JavaScript array
shortTitle: N min or max elements of an array
type: tip
language: javascript
tags: [math,array]
cover: digital-nomad-15
excerpt: Find the `n` minimum or maximum elements in a JavaScript array quickly and easily.
dateModified: 2023-10-05
---

We've previously covered [finding the minimum and maximum value in a numeric array](/js/s/array-min-max), but what if you need to find the `n` minimum or maximum values? Turns out it's almost as easy.

For either one of the operations, we'll first need to **sort the array in ascending or descending order**. This can be done using `Array.prototype.sort()` and the appropriate comparator function. However, we'll need to create a **shallow clone** of the array first using the spread operator (`...`) to avoid mutating the original array.

Then, we can use `Array.prototype.slice()` to get the first `n` elements of the sorted array. If `n` is not provided, we'll get the first element of the array. If `n` is greater than or equal to the length of the array, we'll get the original array back.

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1, 2]
maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3, 2]
```
