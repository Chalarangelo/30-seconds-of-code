---
title: sortOddOnly
tags: array,intermediate
firstSeen: 2021-06-18 13:00:00 +0300
---

Takes an `array` of numbers and sorts only the odd numbers in ascending order. The positions of the even numbers remain unchanged. 

- Use `Array.prototype.filter()` and the modulo operator (`%`) to get the odd numbers.
- Use `Array.prototype.sort()` to sort the odd numbers in ascending order.
- Store the resulting array as a variable called `oddNums`.
- Use `Array.prototype.map()` on each number in the original array. If the number is odd, replace it with the first value of the `oddNums` array using `Array.prototype.shift()`.

```js
const sortOddOnly = (array) => {
  const oddNums = array
    .filter(number => number % 2)
    .sort((a, b) => a - b);
  return array
    .map(number => number % 2 ? oddNums.shift() : number);
};
```

```js
sortOddOnly([6, 4, 9, 2, 3, 7, 5, 10]); 
// [6, 4, 3, 2, 5, 7, 9, 10] 
```
