---
title: overArgs
tags: function,intermediate
firstSeen: 2018-01-28T14:54:16+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Creates a function that invokes the provided function with its arguments transformed.

- Use `Array.prototype.map()` to apply `transforms` to `args` in combination with the spread operator (`...`) to pass the transformed arguments to `fn`.

```js
const overArgs = (fn, transforms) =>
  (...args) => fn(...args.map((val, i) => transforms[i](val)));
```

```js
const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
fn(9, 3); // [81, 6]
```
