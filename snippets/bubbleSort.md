---
title: bubbleSort
tags: algorithm,array,beginner
firstSeen: 2020-12-27T21:20:31+02:00
lastUpdated: 2020-12-29T12:18:58+02:00
---

Sorts an array of numbers, using the bubble sort algorithm.

- Declare a variable, `swapped`, that indicates if any values were swapped during the current iteration.
- Use the spread operator (`...`) to clone the original array, `arr`.
- Use a `for` loop to iterate over the elements of the cloned array, terminating before the last element.
- Use a nested `for` loop to iterate over the segment of the array between `0` and `i`, swapping any adjacent out of order elements and setting `swapped` to `true`.
- If `swapped` is `false` after an iteration, no more changes are needed, so the cloned array is returned.

```js
const bubbleSort = arr => {
  let swapped = false;
  const element = [...arr];
  for (let outerIndex = 1; outerIndex < a.length; outerIndex++) {
    swapped = false;
    for (let innerIndex = 0; innerIndex < a.length - outerIndex; innerIndex++) {
      if (a[innerIndex + 1] < a[innerIndex]) {
        [a[innerIndex], a[innerIndex + 1]] = [a[innerIndex + 1], a[innerIndex]];
        swapped = true;
      }
    }
    if (!swapped) return element;
  }
  return element;
};
```

```js
bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]
```
