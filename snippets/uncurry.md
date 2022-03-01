---
title: Uncurry function
tags: function
expertise: advanced
firstSeen: 2018-02-14T11:56:44+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Uncurries a function up to depth `n`.

- Return a variadic function.
- Use `Array.prototype.reduce()` on the provided arguments to call each subsequent curry level of the function.
- If the `length` of the provided arguments is less than `n` throw an error.
- Otherwise, call `fn` with the proper amount of arguments, using `Array.prototype.slice()`.
- Omit the second argument, `n`, to uncurry up to depth `1`.

```js
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError('Arguments too few!');
  return next(fn)(args.slice(0, n));
};
```

```js
const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6
```
