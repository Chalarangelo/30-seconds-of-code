---
title: Linear search in a JavaScript array
shortTitle: Linear search
language: javascript
tags: [algorithm,array]
cover: tranquil-desktop
excerpt: Use the linear search algorithm to find the first index of a given element in an array.
listed: true
dateModified: 2024-07-19
---

The [linear search algorithm](https://en.wikipedia.org/wiki/Linear_search) is a simple and straightforward way to **find the index of a given element** in an array. It works by iterating over each element in the array and comparing it with the target element.

A linear search has a **time complexity** of `O(n)`, where `n` is the number of elements in the array. This means that the time it takes to find the element is **directly proportional** to the size of the array.

Implementing a linear search is relatively easy, as it only requires a `for...in` **loop** to iterate over the elements and compare them with the target element. If the element is **found**, the index is returned. As the `for...in` loop iterates over the indexes as strings, the unary `+` operator is used to convert the index to a number before returning it.

If the element is **not found** after iterating over the entire array, `-1` is returned to indicate that the element is not present.

```js
const linearSearch = (arr, item) => {
  for (const i in arr)
    if (arr[i] === item) return +i;

  return -1;
};

linearSearch([2, 9, 9], 9); // 1
linearSearch([2, 9, 9], 7); // -1
```

> [!NOTE]
>
> This implementation is intended **mainly for demonstration purposes**. The built-in `Array.prototype.indexOf()` method should be used for practical applications, instead.
