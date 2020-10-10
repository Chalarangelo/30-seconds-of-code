---
title: Binary Search Recursive
tags: array,intermediate,recursion
---

Returns `true` if the given integer is a present in the array using Binary Search algorithm, `false` otherwise.

- Check if search query is null, undefined or integer array is empty or not. If yes then return `false`
- Get the integer array middle index. If the array contains only one element then middleIndex will be 0 otherwise we will divide the array by 2 and using `Math.ceil(number)` method to round the number.
- Check if the element at this index is equal to the search integer. If yes then return `true` since the element is being found.
- Else check if this element is less then the search integer. If yes then call the function recursively by sending the new array to it below the middle point. Otherwise call the function recursively by sending the new array to it above the middle point.
- If none of the above conditions are valid then return false since we have reached our base case.

```js
const BinarySearch = (intArr, searchQuery) => {
  if (searchQuery === null || searchQuery === undefined || intArr.length === 0) {
    return false
  }

  const middleIndex = intArr.length === 1 ? 0 : Math.ceil(intArr.length / 2)

  if (intArr[middleIndex] === searchQuery) {
    return true
  } else if (intArr.length > 1) {
    return intArr[middleIndex] < searchQuery ? BinarySearch(intArr.slice(1, middleIndex)) : BinarySearch(intArr.slice(middleIndex))
  } else {
    return false
  }
}
```

```js
BinarySearch([1, 2, 3, 4, 5, 6, 7], 5); // true
BinarySearch([1, 2, 4, 5, 6], 5); // true
BinarySearch([5], 5); // true
BinarySearch([1, 2, 3, 4, 5], 0); // false
BinarySearch([1, 2, 3, 4, 5]); // false
BinarySearch([], 1); // false
```
