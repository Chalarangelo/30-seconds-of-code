---
title: juxt
tags: array,function,advanced
---

Takes several functions as argument and returns a fn that is the juxtaposition of those fns.

juxt(fn1, fn2, fn3, ...) use `Array.prototype.map()` to return a `func` that can take a variable number of `args`.
When `func` is called, return a array containing the result of applying each fn (fn1, fn2, fn3, ...) to the `args`.

```js
const juxt = (...fns) => (...x) => [...fns].map(fn => [...x].map(x => fn(x)));
```

```js
juxt(
  x => x + 1,
  x => x - 1,
  x => x * 10,
  x => x / 10
)(1, 2, 3) // => [ [ 2, 3, 4 ], [ 0, 1, 2 ], [ 10, 20, 30 ], [ 0.1, 0.2, 0.3 ] ]

juxt(
  s => s.length,
  s => s.split(" ").join("-")
)("30 seconds of code") // => [ [ 18 ], [ '30-seconds-of-code' ] ]

```
