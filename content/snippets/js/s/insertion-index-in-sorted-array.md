---
title: How can I find the insertion index of an element in a sorted JavaScript array?
shortTitle: Insertion index in sorted array
language: javascript
tags: [array,math]
cover: apples
excerpt: Given a sorted array, find the correct index to insert a given value.
listed: true
dateModified: 2024-01-02
---

A **sorted array** is useful as long as it can maintain its sorting order. Unfortunately, **inserting a new element** into a sorted array is not as simple as pushing it to the end of the array. Instead, it requires **finding the correct index** to insert it at.

> [!NOTE]
>
> The code snippets presented in this article **loosely check if the array is sorted in ascending or descending order**. If you want to be more strict or have checks for this in place, you should alter the code to reflect that.

## Insertion index in sorted array

To find the **lowest insertion index** of an element in a sorted array, you can use `Array.prototype.findIndex()` to find the appropriate index where the element should be inserted.

```js
const insertionIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};

insertionIndex([5, 3, 2, 1], 4); // 1
insertionIndex([30, 50], 40); // 1
```

Conversely, to find the **highest insertion index** of an element in a sorted array, you can use `Array.prototype.findLastIndex()` to find the appropriate index where the element should be inserted.

```js
const lastInsertionIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findLastIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? arr.length : index;
};

lastInsertionIndex([10, 20, 30, 30, 40], 30); // 3
```

## Using a comparator function to determine the insertion index

For more complex data, you might need a **comparator function** to determine the insertion index. For example, if you have an **array of objects**, you might want to find the insertion index based on a specific property of each object.

The technique is the same as above, except for applying the given comparator function to each element of the array before comparing it to the given value.

The comparator expects two elements to compare and should return `0` if they are equal, a negative number if the first element comes before the second, or a positive number if the first element comes after the second. In the case of a descending order, the order of the elements should be reversed.

```js
const insertionIndexBy = (arr, n, comparatorFn) => {
  const index = arr.findIndex(el => comparatorFn(n, el) < 0);
  return index === -1 ? arr.length : index;
};

insertionIndexBy([{ x: 4 }, { x: 6 }], { x: 5 }, (a, b) => a.x - b.x); // 1
insertionIndexBy([{ x: 6 }, { x: 4 }], { x: 5 }, (a, b) => b.x - a.x); // 1
```
