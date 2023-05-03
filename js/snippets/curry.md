---
title: Curry function
type: snippet
tags: [function,recursion]
cover: rocky-beach-2
dateModified: 2020-10-22T20:23:47+03:00
---

Curries a function.

- Use recursion.
- If the number of provided arguments (`args`) is sufficient, call the passed function `fn`.
- Otherwise, use `Function.prototype.bind()` to return a curried function `fn` that expects the rest of the arguments.
- If you want to curry a function that accepts a variable number of arguments (a variadic function, e.g. `Math.min()`), you can optionally pass the number of arguments to the second parameter `arity`.

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
```

```js
curry(Math.pow)(2)(10); // 1024
curry(Math.min, 3)(10)(50)(2); // 2
```
