---
title: islandsCount
tags: array,beginner
---

Given an array of 0s and 1s, `islandsCount` counts the number of "islands" of 1s.

- Uses `Array.prototype.forEach()` to loop over the inputted array.
  - In the callback of `forEach()` two parameters are given, the first is the   `currentValue` which is called number, and the second is the `index` of the `currentValue` in the array.
- `Conditional (ternary) operator` checks if the currentValue is zero and if the following value is one OR
  - If the index is zero and the currentValue is one (i.e. The first number of the array is a 1). 
  - If the above conditions evaluate to true, it increments the count variable.
  - If the above conditions evaluate to false, then nothing happens.
- Once the `Array.prototype.forEach()` has finished iterating, the `islandsCount` function returns the count variable.

```js
const islandsCount = (array) => {
  let count = 0;
  array.forEach((number, index) => {
    ((number === 0 && array[index + 1] === 1) || (index === 0 && number === 1)) ? count += 1 : null;
  });
  return count;
}
```

```js
  console.log(islandsCount([0,1,1,0,1,0,1])); // 3
  console.log(islandsCount([0,1,0,1,1,0,0,0,1,0])); // 3
  console.log(islandsCount([1,0,1])); // 2
```
