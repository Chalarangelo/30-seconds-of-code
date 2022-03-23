---
title: Converge branching functions
tags: function
expertise: intermediate
excerpt: Converges a list of branching functions into a single function and returns the result.
firstSeen: 2018-02-07T12:23:04+02:00
lastUpdated: 2021-01-08T00:23:44+02:00
---

Accepts a converging function and a list of branching functions and returns a function that applies each branching function to the arguments and the results of the branching functions are passed as arguments to the converging function.

- Use `Array.prototype.map()` and `Function.prototype.apply()` to apply each function to the given arguments.
- Use the spread operator (`...`) to call `converger` with the results of all other functions.

```js
const converge = (converger, fns) => (...args) =>
  converger(...fns.map(fn => fn.apply(null, args)));
```

```js
const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
average([1, 2, 3, 4, 5, 6, 7]); // 4
```
