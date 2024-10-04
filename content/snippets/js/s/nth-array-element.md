---
title: Get the nth element of a JavaScript array
shortTitle: Nth array element
language: javascript
tags: [array]
cover: dark-leaves-6
excerpt: Find the nth or every nth element of a JavaScript array.
listed: true
dateModified: 2024-01-19
---

Retrieving an element from a JavaScript array is most often done using its index. But what if we want to get the nth element from the **end of the array**? Or, perhaps, get all **elements at an index that is a multiple** of `n`? Let's see how we can do that.

## Get the nth element of a JavaScript array

Getting the nth element of a JavaScript array can be easily done, using `Array.prototype.slice()`. The only thing you need to keep in mind is **negative indexes**, which you can be used to get the last nth element of the array.

```js
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];

nthElement(['a', 'b', 'c'], 1); // 'b'
nthElement(['a', 'b', 'b'], -3); // 'a'
nthElement(['a', 'b', 'b'], 3); // undefined
```

## Get every nth element of a JavaScript array

If you need to get every nth element of a JavaScript array, you can use `Array.prototype.filter()`. Combined with the modulo operator (`%`), you can use it to keep only the elements that are at every nth position in the array.

```js
const everyNth = (arr, nth) =>
  arr.filter((e, i) => i % nth === nth - 1);

everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```
