---
title: reverseArrayInPlace
tags: array,beginner
---

Reverses the order of elements in an array in place.

- In-place array reversal modifies the argument array.
- Two indices are initialized to starting and ending indices of the array.
- A for loop iterates over the elements and swaps them in position.
- Loop terminates when the starting index has reached the array's middle index.

```js
const reverseArrayInPlace = (array) => {
  for (let i = 0, j = array.length - 1; i < array.length / 2; i++, j--) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
```

```js
reverseArrayInPlace([1, 2, 3]); // [3, 2, 1]
```
