---
title: Partition array
type: snippet
language: javascript
tags: [array,object]
cover: people-on-beach
dateModified: 2020-10-22
---

Applies `fn` to each value in `arr`, splitting it each time the provided function returns a new value.

- Use `Array.prototype.reduce()` with an accumulator object that will hold the resulting array and the last value returned from `fn`.
- Use `Array.prototype.push()` to add each value in `arr` to the appropriate partition in the accumulator array.

```js
const partitionBy = (arr, fn) =>
  arr.reduce(
    ({ res, last }, v, i, a) => {
      const next = fn(v, i, a);
      if (next !== last) res.push([v]);
      else res[res.length - 1].push(v);
      return { res, last: next };
    },
    { res: [] }
  ).res;
```

```js
const numbers = [1, 1, 3, 3, 4, 5, 5, 5];
partitionBy(numbers, n => n % 2 === 0); // [[1, 1, 3, 3], [4], [5, 5, 5]]
partitionBy(numbers, n => n); // [[1, 1], [3, 3], [4], [5, 5, 5]]
```
