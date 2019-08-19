---
title: initializeArrayWithRange
tags: array,math,intermediate
---

Initializes an array containing the numbers in the specified range where `start` and `end` are inclusive with their common difference `step`.

Use `Array.from()` to create an array of the desired length, `(end - start + 1)/step`, and a map function to fill it with the desired values in the given range.
You can omit `start` to use a default value of `0`.
You can omit `step` to use a default value of `1`.

```js
const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }, (v, i) => i * step + start);
```

```js
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
```