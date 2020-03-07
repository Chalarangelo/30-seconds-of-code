---
title: increment
tags: math,array,beginner
---

Returns the array after incrementing each element with the given number.
Use `map()` to increment each element in `arr` by `inc`, in order .
Omit the second argument, `inc`, to use `1` as a default.


```js
const incrementAllBy = (arr, inc = 1) => arr.map(function(val){return ++val;});
```

```js
incrementAllBy([1, 2, 3]); // [2, 3, 4]
average([1, 2, 3],2); // [3, 4, 5]
```