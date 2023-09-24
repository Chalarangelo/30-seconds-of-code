---
title: Merge objects
type: snippet
language: javascript
tags: [object,array]
cover: guitar-living-room
dateModified: 2020-10-21
---

Creates a new object from the combination of two or more objects.

- Use `Array.prototype.reduce()` combined with `Object.keys()` to iterate over all objects and keys.
- Use `Object.prototype.hasOwnProperty()` and `Array.prototype.concat()` to append values for keys existing in multiple objects.

```js
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );
```

```js
const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
};
merge(object, other);
// { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
```
