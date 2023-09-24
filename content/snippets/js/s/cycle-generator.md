---
title: Cycle generator
type: snippet
language: javascript
tags: [function,generator]
author: chalarangelo
cover: secret-tree
dateModified: 2020-10-11
---

Creates a generator, looping over the given array indefinitely.

- Use a non-terminating `while` loop, that will `yield` a value every time `Generator.prototype.next()` is called.
- Use the module operator (`%`) with `Array.prototype.length` to get the next value's index and increment the counter after each `yield` statement.

```js
const cycleGenerator = function* (arr) {
  let i = 0;
  while (true) {
    yield arr[i % arr.length];
    i++;
  }
};
```

```js
const binaryCycle = cycleGenerator([0, 1]);
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }
binaryCycle.next(); // { value: 0, done: false }
binaryCycle.next(); // { value: 1, done: false }
```
