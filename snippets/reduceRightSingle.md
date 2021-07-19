---
title: reduceRightSingle
tags: array,intermediate
firstSeen: 2021-07-19T04:32:47Z
lastUpdated: 2021-07-19T04:32:47Z
---

Applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.

- Use `Array.prototype.reduceRight()`to executes the callback function once for each array present in the array(from right-to-left).
- Use `Array.prototype.concat()`to merge the arrays. Return a new single array.

```js
const reduceRightSingle = arr =>
  arr.reduceRight( (accumulator, currentValue) => accumulator.concat(currentValue)
);
```

```js
reduceRightSingle([[0, 1], [2, 3], [4, 5]]) //[4, 5, 2, 3, 0, 1]
```
