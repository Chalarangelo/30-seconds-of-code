---
title: last
tags: array,beginner
---

Returns the last element in an array.

Check if `arr` is an instance of an `Array`, use `arr.length - 1` to compute the index of the last element of the given array and return it, otherwise return `undefined`.

```js
const last = arr => (arr instanceof Array ? arr[arr.length - 1] : undefined);
```

```js
last([1, 2, 3]); // 3
last([]); // undefined
last(null); // undefined
last(undefined); // undefined
```
