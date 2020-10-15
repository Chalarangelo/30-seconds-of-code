---
title: allTrue
tags: array, every, javascript, beginner
---

`Array.prototype.every()` returns `true` if provided callback returns `true` for every element in the array, `false` otherwise.

- Full syntax: `array.every(callback(element[, index[, array]])[, thisArg])`
- `callback` is the function to test for each element. It takes three optional arguments:
-- `element` - current element beeing processed
-- `index` - index of currently processed element
-- `array` - the array `every` was called upon
- `thisArg` is also optional - it's a value to use as `this` when executing `callback`

```js
const allTrue = (array, callback) => array.every(callback);
```

```js
const evenNumbers = [2, 4, 6];
const oddNumbers = [1, 3, 5];
const mixedNumbers = [1, 2, 3, 4];
const isNumberEven = (number) => number % 2 === 0;

allTrue(evenNumbers, isNumberEven); // true
allTrue(oddNumbers, isNumberEven); // false
allTrue(mixedNumbers, isNumberEven); // false
```
