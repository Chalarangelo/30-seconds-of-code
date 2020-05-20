---
title: partitionBy
tags: array,object,function,intermediate
---

Applies `fn` to each value in `arr`, splitting it each time `fn` returns a new value.

Use `Array.prototype.reduce()` and `Array.prototype.push()` to create the start index of each partition.
Use `Array.prototype.map()` to create the slice interval of each partition.
Use `Array.prototype.slice()` to create each partition.

```js
const partitionBy = (arr, fn) =>
  arr
    .reduce((acc, val, i, a) => {
      acc.push(fn(val, i, a));
      return acc;
    }, [])
    .reduce((acc, val, i, a) => {
      if (val !== a[i + 1]) {
        acc.push(i + 1);
      }
      return acc;
    }, [])
    .map((interval, i, a) =>
      i === 0 ? arr.slice(...[0, interval]) : arr.slice(...[a[i - 1], interval])
    );
```

```js
const numbers = [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 4, 5, 5, 5, 5, 5];
partitionBy(numbers, n => n % 2 === 0); // = > [ [ 1, 1, 1, 1, 1, 3, 3, 3, 3, 3 ], [ 4 ], [ 5, 5, 5, 5, 5 ] ]
partitionBy(numbers, n => n); // => [ [ 1, 1, 1, 1, 1 ], [ 3, 3, 3, 3, 3 ], [ 4 ], [ 5, 5, 5, 5, 5 ] ]
```
