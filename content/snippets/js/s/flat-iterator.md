---
title: Flat iterator
type: snippet
language: javascript
tags: [array,iterator,generator]
author: chalarangelo
cover: sail-away-2
dateModified: 2022-03-09
---

Creates a generator that iterates over an iterable, flattening nested iterables.

- Use recursion.
- Use a `for...of` loop to iterate over the values of the given iterable.
- Use `Symbol.iterator` to check if each value is an iterable. If it is, use the `yield*` expression to recursively delegate to the same generator function. Otherwise, `yield` the current value.

```js
const flatIterator = function* (itr) {
  for (let item of itr) {
    if (item[Symbol.iterator]) yield* flatIterator(item);
    else yield item;
  }
};
```

```js
const arr = [1, 2, [3, 4], [5, [6, [7], 8]], 9, new Set([10, 11])];
[...flatIterator(arr)]; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
```
