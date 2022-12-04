---
title: Check if array elements are equal
tags: array
cover: blog_images/shelf-plant.jpg
firstSeen: 2018-08-03T00:03:08+03:00
lastUpdated: 2020-10-18T20:24:28+03:00
---

Checks if all elements in an array are equal.

- Use `Array.prototype.every()` to check if all the elements of the array are the same as the first one.
- Elements in the array are compared using the strict comparison operator, which does not account for `NaN` self-inequality.

```js
const allEqual = arr => arr.every(val => val === arr[0]);
```

```js
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
