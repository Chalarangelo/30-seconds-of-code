---
title: flatMap
tags: array,function,intermediate
---

The flatMap() method first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map() followed by a flat() of depth 1, but flatMap() is often quite useful, as merging both into one method is slightly more efficient.

```js
let arr = [1, 2, 3, 4];

arr.map(x => [x, x * 2]);
// [[1, 2], [2, 4], [3, 6], [4,8]];


with flatMap it would be

arr.flatMap(x => [x, x * 2]);
// [1, 2, 2, 4, 3, 6, 4, 8]
```
