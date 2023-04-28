---
title: Rearrange function arguments
type: snippet
tags: [function]
cover: island-corridor
dateModified: 2020-10-22T20:24:04+03:00
---

Creates a function that invokes the provided function with its arguments arranged according to the specified indexes.

- Use `Array.prototype.map()` to reorder arguments based on `indexes`.
- Use the spread operator (`...`) to pass the transformed arguments to `fn`.

```js
const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]));
```

```js
var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']
```
