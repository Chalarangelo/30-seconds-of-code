---
title: reverseArray
tags: array,intermediate
---

Reverse an Array

- Create a `start` and `end` variable to store the first and last index of the array `arr`.
- Use a `while` loop until the `start` is greater than the `end`.
- Store the value `arr[start]` in a `temp` variable so you could use it once it changes to `arr[end]`.
- Make sure to increment the `start` and decrement the `end`.

```js
const reverse = (arr, start, end) => {
    while (start < end) {
        var temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    return arr
};
```

```js
reverse([1,2,3,4,5]); // [5,4,3,2,1]
```
