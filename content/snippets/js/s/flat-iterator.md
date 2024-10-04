---
title: How can I iterate over nested iterables in JavaScript?
shortTitle: Flat iterator
language: javascript
tags: [array,iterator,generator,recursion]
cover: sail-away-2
excerpt: Ever wanted to iterate over nested iterables in JavaScript? Here's how.
listed: true
dateModified: 2022-07-25
---

JavaScript's `Symbol.iterator` allows you to define how an object should be iterated over, essentially dictating if it's an **iterable** or not. For simple iterables, this works just fine, but what if you have **nested iterables**? How can you iterate over them in a flat manner?

In order to do so, we can employ a **generator function** coupled with **recursion** to flatten the nested iterables. This way, we can iterate over the values of the given iterable, checking if each value is an iterable itself. If it is, we can recursively delegate to the same generator function, yielding the values as we go.

Putting the theory into code, we use a `for...of` **loop** to iterate over the values of the given iterable. Using `Symbol.iterator`, we can **check if each value is an iterable**. If it is, we use the `yield*` expression to **recursively delegate to the same generator function**. Otherwise, we `yield` the current value.

```js
const flatIterator = function* (itr) {
  for (let item of itr) {
    if (item[Symbol.iterator]) yield* flatIterator(item);
    else yield item;
  }
};

const arr = [1, 2, [3, 4], [5, [6, [7], 8]], 9, new Set([10, 11])];
[...flatIterator(arr)]; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
```
