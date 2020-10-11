---
title: isContainedIn
tags: array,intermediate
---

Returns `true` if the elements of the first array are contained in the second one regardless of order, `false` otherwise.

- Use `[...new Set()]` to filter out the duplicate elements in first array.
- To ensure that first array has only distinct elements, compare the lengths of the unfiltered and filtered array. If they differ return `false`.
- Use `Array.prototype.forEach()` to convert the second array into an object (hashMap).
- Use `Array.prototype.every()` to check if every element in the first array exist as a key in the hashMap object.
- Return `false` if any of the elements in the first array doesn't exist as a key in the hashMap object.
- Return `true` only if all elements in the first array exist as keys in the hashMap object.

```js
const isContainedIn = (subArr, arr) => {
  if (subArr.length !== [...new Set(subArr)].length) {
    return false;
  }

  const hashMap = {};

  arr.forEach((item, index) => (hashMap[item] = index));

  return subArr.every((item) => hashMap[item] !== undefined);
};
```

```js
isContainedIn([1, 5], [2, 4, 1]); // false
isContainedIn([1, 1, 5], [2, 4, 1, 5]); // false
isContainedIn([], []); // true
isContainedIn([], [3, 5]); // true
isContainedIn([1, 4], [2, 4, 1]); // true
```
