---
title: interpolationSearch
tags: algorithm,array,beginner
firstSeen: 2021-06-13T05:00:00-04:00
---

Finds the index of given element in a uniformly distributed sorted array using the interpolation search algorithm.

- This algorithm is an imporved version of binary search.
- Declare 2 variables,`low` and `high`,initialized to `0` and the `length` of the array respectively.
- In a `while` loop, calculate the value of `pos` using the `probe position formula`.
- Return the index of the item if `array[pos]` is equal to `target element`, else return `-1`.
- If the `target element` is less than `array[pos]` , calculate the probe position of the `left sub-array`. Otherwise calculate the same in the `right sub-array`. 
- Repeat until a match is found or the sub-array reduces to zero.

```js
const interpolationSearch = (arr, x) => {
  let n = arr.length;
  // Define the left-most and right-most indexes of array
  let low = 0;
  let high = n - 1;

  // Since array is sorted, an element present
  // in array must be in range defined by corner
  while (low <= high && x >= arr[low] && x <= arr[high]) {
    if (low == high) {
      if (arr[low] == x) return low;
      return -1;
    }
    // Probing the position with keeping
    // uniform distribution in mind.
    let pos =
      low + (parseFloat(high - low) / (arr[high] - arr[low])) * (x - arr[low]);

    // Condition of target found
    if (arr[pos] == x) return pos;

    // If x is larger, x is in upper part
    if (arr[pos] < x) low = pos + 1;
    // If x is smaller, x is in the lower part
    else high = pos - 1;
  }
  return -1;
};
```

```js
interpolationSearch([1,3,5,7,9,11,13,15],11); // return 5
interpolationSearch([1,3,5,7,9,11,13,15],4); // return -1
interpolationSearch([1,3,5,7,9,11,13,15],7); // return 3
```
