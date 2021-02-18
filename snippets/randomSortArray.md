---
title: randomSortArray
tags: array, beginner
---

This function return a randomly sorted array.

- Use `Array.prototype.sort()` to sort the elements.
- Use a compare function. If the result is negative first parameter is sorted before second and vice versa.
- Use `Math.radom()` to generate a random positive number less than 1.

```js
const randomSortArray = arr => arr.sort((a, b) => 0.5-Math.random())
```

```js
randomSortArray([3, 5, 6, 10, 15]); // 5, 6, 15, 10, 3
```
