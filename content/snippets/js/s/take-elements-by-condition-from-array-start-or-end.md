---
title: Get elements from the start or end of a JavaScript array by condition
shortTitle: Conditionally get array elements from start or end
language: javascript
tags: [array]
cover: sunset-textured-beach
excerpt: Learn how to get elements from the start or end of a JavaScript array by condition, using `Array.prototype.slice()`.
listed: true
dateModified: 2024-01-08
---

We've previously covered [how to get the first or last `n` elements of a JavaScript array](/js/s/take-n-elements-from-array-start-or-end). This time, we'll be looking at how to get elements from the start or end of an array based on a given condition.

## Get elements from the start of the array while condition is met

Modern JavaScript is full of useful array methods, which help us avoid writing `for...of` loops, which I personally find to be a bit old-fashioned. At the core of the problem we want to solve is a very simple task - **find the index of the first element in the array that doesn't meet the condition**. This is exactly what `Array.prototype.findIndex()` is for.

Having found the index, we can use `Array.prototype.slice()` to get the elements from the start of the array up to that index. There's a small caveat, though. `Array.prototype.findIndex()` returns `-1` if **no element in the array meets the condition**. This means that we need to check for that value and return the entire array if that's the case.

```js
const takeWhile = (arr, fn) => {
  const index = arr.findIndex(n => !fn(n));
  return index === -1 ? arr : arr.slice(0, index);
};

takeWhile([1, 2, 3, 4], n => n < 0); // []
takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
takeWhile([1, 2, 3, 4], n => n < 5); // [1, 2, 3, 4]
```

## Get elements from the end of the array while condition is met

Getting elements from the end of the array is pretty similar. To find the index, we'll have to use `Array.prototype.findLastIndex()`. Additionally, we have to add `1` to the index, to account for the behavior of `Array.prototype.slice()`.

```js
const takeRightWhile = (arr, fn) => {
  const index = arr.findLastIndex(n => !fn(n));
  return index === -1 ? arr : arr.slice(index + 1);
};

takeRightWhile([1, 2, 3, 4], n => n > 5); // []
takeRightWhile([1, 2, 3, 4], n => n > 2); // [3, 4]
takeRightWhile([1, 2, 3, 4], n => n > 0); // [1, 2, 3, 4]
```
