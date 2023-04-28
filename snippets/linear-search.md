---
title: Linear search
type: snippet
tags: [algorithm,array]
cover: coworking-space
dateModified: 2020-12-28T12:07:53+02:00
---

Finds the first index of a given element in an array using the linear search algorithm.

- Use a `for...in` loop to iterate over the indexes of the given array.
- Check if the element in the corresponding index is equal to `item`.
- If the element is found, return the index, using the unary `+` operator to convert it from a string to a number.
- If the element is not found after iterating over the whole array, return `-1`.

```js
const linearSearch = (arr, item) => {
  for (const i in arr) {
    if (arr[i] === item) return +i;
  }
  return -1;
};
```

```js
linearSearch([2, 9, 9], 9); // 1
linearSearch([2, 9, 9], 7); // -1
```
