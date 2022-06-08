---
title: Array is sorted
tags: array
expertise: intermediate
cover: blog_images/italian-horizon.jpg
firstSeen: 2018-01-01T19:30:14+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if a numeric array is sorted.

- Calculate the ordering `direction` for the first pair of adjacent array elements.
- Return `0` if the given array is empty, only has one element or the `direction` changes for any pair of adjacent array elements.
- Use `Math.sign()` to covert the final value of `direction` to `-1` (descending order) or `1` (ascending order).

```js
const isSorted = arr => {
  if (arr.length <= 1) return 0;
  const direction = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
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
