---
title: Assign default values for object properties
type: snippet
tags: [object]
cover: boats
dateModified: 2020-10-22T20:23:47+03:00
---

Assigns default values for all properties in an object that are `undefined`.

- Use `Object.assign()` to create a new empty object and copy the original one to maintain key order.
- Use `Array.prototype.reverse()` and the spread operator (`...`) to combine the default values from left to right.
- Finally, use `obj` again to overwrite properties that originally had a value.

```js
const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);
```

```js
defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }
```
