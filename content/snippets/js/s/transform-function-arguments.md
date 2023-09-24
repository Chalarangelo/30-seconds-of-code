---
title: Transform function arguments
type: snippet
language: javascript
tags: [function]
cover: flower-shape-sunset
dateModified: 2020-10-21
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
