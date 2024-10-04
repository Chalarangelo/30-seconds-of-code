---
title: Check if a numeric array is sorted in JavaScript
shortTitle: Array is sorted
language: javascript
tags: [array]
cover: italian-horizon
excerpt: Efficiently check if a numeric array is sorted in ascending or descending order in JavaScript.
listed: true
dateModified: 2024-02-15
---

Sometimes, it's useful to know if an array is sorted in **ascending or descending order**. This can be especially useful in combination with other algorithms, such as **binary search** or **sorting algorithms**.

Sorting the whole array and comparing it to itself is the **naive method**, yet it's wildly **inefficient**. The more efficient way is the traditional `for` loop and some **early returns**.

Starting with the first two elements, calculate the `direction` of the array. If the `direction` changes at any point, return `0`. If the array is **empty or has only one element**, return `0`. If the `direction` remains the same for the whole array, return the `Math.sign()` of the `direction` to get `-1` for descending order and `1` for ascending order.

```js
const isSorted = arr => {
  if (arr.length <= 1) return 0;
  const direction = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
  }
  return Math.sign(direction);
};

isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
isSorted([4]); // 0
```

> [!NOTE]
>
> It's relatively easy to modify the function to work with **non-numeric arrays**. You can use the `localeCompare` method for strings or a custom comparator function for more complex objects.
