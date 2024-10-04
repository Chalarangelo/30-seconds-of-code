---
title: Is JavaScript's array sorting stable?
shortTitle: Stable array sorting
language: javascript
tags: [array]
cover: horse-sunset
excerpt: Understand why JavaScript's built-in array sorting is not stable and how to implement a stable sorting algorithm.
listed: true
dateModified: 2024-03-21
---

The ECMAScript specification does not require JavaScript's built-in sorting algorithm to be stable. Instead, it's up to JavaScript engines to implement their own sorting algorithms, which may or **may not be stable**. This means that the order of equal elements is not guaranteed to be preserved after sorting. This is even more of a headache when dealing with more complex data across different environments.

Luckily, implementing a stable sort is pretty trivial. All you need to do is **fall back to comparing the two elements' indexes when their values are equal**. However, `Array.prototype.sort()` does not provide a way to access the indexes of the elements being compared.

To work around this, you can first use `Array.prototype.map()`to pair each element with its index. Then, using `Array.prototype.sort()`, you can apply the comparator function and, if the values are equal, compare the indexes. Finally, you can use `Array.prototype.map()` again to extract the original elements from the sorted array.

```js
const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

> [!IMPORTANT]
>
> This implementation **doesn't sort in-place**, but rather creates a new array. It's also significantly **slower than the built-in sorting algorithm**, due to the additional mapping steps.
