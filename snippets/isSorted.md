---
title: isSorted
tags: array,intermediate
---

Returns `1` if an array of numbers is sorted in ascending order, `-1` if it is sorted in descending order or `0` if it is not sorted.

- Calculate the ordering `direction` for every pair of adjacent array elements.
- Return `0` if the `direction` changes or the `direction` sign if the last element is reached.

```js
const isSorted = arr => {
  let direction = 0;
  for (let i = 1; i < arr.length; i++) {
    if (!direction) direction = arr[i] - arr[i - 1];
    else if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
  }
  return Math.sign(direction);
};
```

```js
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
isSorted([4]); // 0
```
