---
title: Get the first or last n elements in a JavaScript array
shortTitle: First or last n elements of an array
language: javascript
tags: [array]
cover: fort-lamp
excerpt: Learn how to retrieve the first or last `n` elements in a JavaScript array with a single line of code.
listed: true
dateModified: 2023-10-04
---

`Array.prototype.slice()` is a versatile tool in every JavaScript developer's arsenal. It retrieves the **values of an array between two indices**, handling edge cases like negative and out-of-bounds indices. This makes it ideal for retrieving the first or last `n` elements of an array.

For the first `n` elements, you can use a start value of `0` and an end value of `n`. For the last `n` elements, you can use a start value of `-n` and no end value.

```js
const firstN = (arr, n = 1) => arr.slice(0, n);
const lastN = (arr, n = 1) => arr.slice(-n);

const arr = ['a', 'b', 'c', 'd'];

firstN(arr); // ['a']
firstN(arr, 2); // ['a', 'b']
firstN(arr, 5); // ['a', 'b', 'c', 'd']

lastN(arr); // ['d']
lastN(arr, 2); // ['c', 'd']
lastN(arr, 5); // ['a', 'b', 'c', 'd']
```

As you can see, it only takes a single line of code to get the first or last `n` elements of an array. This code also handles **out-of-bounds indices**, resulting in a shallow clone of the original array. Be mindful of **negative** `n` values, however, as the results will not make much sense.
