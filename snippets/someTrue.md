---
title: someTrue
tags: array, some, javascript, beginner
---

`Array.prototype.some()` returns `true` if provided callback returns `true` for at least one element in the array, `false` otherwise.

- Full syntax: `array.some(callback(element[, index[, array]])[, thisArg])`
- `callback` is the function to test for each element. It takes three optional arguments:
-- `element` - current element beeing processed
-- `index` - index of currently processed element
-- `array` - the array `some` was called upon
- `thisArg` is also optional - it's a value to use as `this` when executing `callback`

```js
const someTrue = (array, callback) => array.some(callback);
```

```js
const evenNumbers = [2, 4, 6];
const oddNumbers = [1, 3, 5];
const mixedNumbers = [1, 2, 3, 4];
const isNumberEven = (number) => number % 2 === 0;

someTrue(evenNumbers, isNumberEven); // true
someTrue(oddNumbers, isNumberEven); // false
someTrue(mixedNumbers, isNumberEven); // true
```
