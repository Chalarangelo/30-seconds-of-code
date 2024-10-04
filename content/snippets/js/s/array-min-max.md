---
title: Min and max value of a JavaScript array
shortTitle: Min and max value of an array
language: javascript
tags: [array,math]
cover: little-tree
excerpt: When working with JavaScript arrays, you might need the minimum or maximum value. Here are a few quick and easy ways to do it.
listed: true
dateModified: 2023-12-30
---

## Min & max value of a numeric array

When working with numeric arrays in JavaScript, you might find yourself in need of finding the **minimum** or **maximum** value. Luckily, JavaScript's `Math` built-in object has got you covered. You can simply use `Math.min()` or `Math.max()` combined with the spread operator (`...`), as both functions accept any number of arguments.

```js
const nums = [2, 4, 6, 8, 1, 3, 5, 7];

Math.max(...nums); // 8
Math.min(...nums); // 1
```

## N min & max values of a numeric array

What if you need to find the `n` minimum or maximum values? Turns out it's almost as easy.

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

## Min & max value of an array based on function

For more complex cases, such as finding the min/max value in an **array of objects**, you will have to use `Array.prototype.map()`. Given an **appropriate function** or a **property name**, you can map the array to an array of values and then use the same approach as above.

```js
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));

minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 2
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 8
```
