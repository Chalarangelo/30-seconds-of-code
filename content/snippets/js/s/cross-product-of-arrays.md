---
title: Cross product of two JavaScript arrays
shortTitle: Array cross product
type: tip
language: javascript
tags: [math,array]
cover: cup-of-orange
excerpt: Create a new array out of the two supplied by creating each possible pair from the arrays.
dateModified: 2024-03-20
---

The **cross product** of two arrays is a new array that contains **every possible pair of elements** from the two arrays. This can be useful in many mathematical and programming scenarios.

In order to calculate the cross product of two arrays, you can use `Array.prototype.reduce()` on the first array and `Array.prototype.map()` on the second array to create each possible pair. Then, you can use `Array.prototype.concat()` to combine all the pairs into a single array.

```js
const crossProduct = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

crossProduct([1, 2], ['a', 'b']);
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
