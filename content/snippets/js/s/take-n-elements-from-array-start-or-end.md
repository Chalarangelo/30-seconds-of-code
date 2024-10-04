---
title: Get N elements from the start or end of a JavaScript array
shortTitle: Get N array elements from start or end
language: javascript
tags: [array]
cover: interior-7
excerpt: Learn how to get the first or last N elements of a JavaScript array, using `Array.prototype.slice()`.
listed: true
dateModified: 2023-07-09
---

A very common scenario when working with arrays is to **get a subset of elements** from the start or end of the array. Depending on the use-case and the desired result, there are a few variants of this operation that might fit your needs.

## Get the first N elements of an array

Starting simple, you might want to get the **first N elements** of an array. Using `Array.prototype.slice()` you can easily achieve this by passing `0` as the starting index and `n` as the ending index.

```js
const take = (arr, n = 1) => arr.slice(0, n);

take([1, 2, 3], 0); // []
take([1, 2, 3], 2); // [1, 2]
take([1, 2, 3], 5); // [1, 2, 3]
```

As you can see from these examples, `Array.prototype.slice()` is versatile enough to handle values of `n` that would be well outside the array. This means that if the value of `Array.prototype.length` is less than or equal to `n`, all elements in the array will be retrieved.

**Negative values** are a little odd, as you will end up getting all values between `0` and the nth to last element. If you want to avoid that behavior, you could simply add some code to validate that `n` is greater than or equal to `0` and throw an error otherwise.

## Get the last N elements of an array

Getting the **last N elements** of an array is pretty similar. Passing a negative index to `Array.prototype.slice()` is all that's necessary to make this work.

```js
const takeRight = (arr, n = 1) => arr.slice(-n);

takeRight([1, 2, 3], 2); // [2, 3]
takeRight([1, 2, 3], 0); // [1, 2, 3] - Huh?
takeRight([1, 2, 3], 5); // [1, 2, 3]
```

While this works in most cases, passing a value of `0` for `n` will result in the retrieval of all array elements. You can mitigate this by using `Array.prototype.length` to always pass two positive values to `Array.prototype.slice()`.

```js
const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);

takeRight([1, 2, 3], 2); // [2, 3]
takeRight([1, 2, 3], 0); // []
takeRight([1, 2, 3], 5); // [2, 3] - Huh?
```

This variant ends up breaking in case `n` is greater than the length of the array, which isn't great. Instead of overly complex solutions, including a ternary operator (`?`) in the original variant should be more than enough.

```js
const takeRight = (arr, n = 1) => n === 0 ? [] : arr.slice(-n);

takeRight([1, 2, 3], 2); // [2, 3]
takeRight([1, 2, 3], 0); // []
takeRight([1, 2, 3], 5); // [1, 2, 3]
```

Again, **negative values** will result in an odd behavior, so you might want to add some validation code to prevent that.
