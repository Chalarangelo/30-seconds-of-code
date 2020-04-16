---
title: nthArg
tags: function,beginner
---

Creates a function that gets the argument at index `n`. If `n` is negative, the nth argument from the end is returned.

Use `Array.prototype.slice()` to get the desired argument at index `n`.

```js
const nthArg = n => (...args) => args.slice(n)[0];
```

```js
const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5
```
