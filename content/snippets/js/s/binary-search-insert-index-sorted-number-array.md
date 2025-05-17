---
title: Using binary search to find the index to insert a number in a sorted JavaScript array
shortTitle: Binary search insertion index
language: javascript
tags: [algorithm,array,math]
cover: tokyo-tower
excerpt: Combining techniques presented in the past, we can solve a more complex problem with stellar performance.
listed: true
dateModified: 2025-06-19
---

In the past, I've tackled how to [find the insertion index of an element in a sorted array](/js/s/insertion-index-in-sorted-array), using `Array.prototype.findIndex()`. However, this approach has a time complexity of `O(n)`, which is **not ideal for large arrays**. Naturally, when solving [the same problem on LeetCode](https://leetcode.com/problems/search-insert-position/description), I felt like I could do better, especially given the problem's `O(n log n)` time complexity constraint.

If you remember from a past article, the [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search) is a **fast and efficient** way to find the index of an element in a **sorted array**. It works by repeatedly dividing the search interval in half, narrowing down the possible locations of the element.

@[Quick refresher](/js/s/binary-search)

The binary search algorithm's goal is to **find the index of a given element** in a sorted array. However, in this case, we want to **find the index where we can insert a new element** while maintaining the sorted order. The two problems are very similar in nature, so we can use the same algorithm with a few tweaks.

First, we'll implement the same `while` loop to **narrow down the search interval**. If we end up stumbling upon the exact **same value**, we can simply return the index of that value. Otherwise, we'll keep going until the **loop termination condition** is met. At that point, we can **return the left boundary** of the search interval, which will be the index where we can insert the new element.

```js {12}
const searchInsert = (arr, item) => {
  let l = 0, r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] === item) return mid;
    if (arr[mid] < item) l = mid + 1;
    else r = mid - 1;
  }

  return l;
};

searchInsert([1, 3, 5, 6], 5); // 2
searchInsert([1, 3, 5, 6], 2); // 1
searchInsert([1, 3, 5, 6], 7); // 4
```

Literally, the only thing that changed was the `return` statement at the end of the function. Instead of returning `-1`, we return the left boundary of the search interval.

> [!NOTE]
>
> Same as the original algorithmic implementation, this implementation **does not account for duplicate values** in the array.
