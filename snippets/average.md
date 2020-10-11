---
title: average
tags: math,array,beginner
---

Returns the average of two or more numbers.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const average = (...numbers) => numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
```

```js
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```
