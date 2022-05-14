---
title: Rearrange function arguments
tags: function
expertise: intermediate
cover: blog_images/island-corridor.jpg
firstSeen: 2018-01-28T15:04:21+02:00
lastUpdated: 2020-10-22T20:24:04+03:00
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
