---
title: Unflatten object
type: snippet
tags: [object]
cover: purple-flower-bunch
dateModified: 2020-10-22T20:24:44+03:00
---

Unflatten an object with the paths for keys.

- Use nested `Array.prototype.reduce()` to convert the flat path to a leaf node.
- Use `String.prototype.split()` to split each key with a dot delimiter and `Array.prototype.reduce()` to add objects against the keys.
- If the current accumulator already contains a value against a particular key, return its value as the next accumulator.
- Otherwise, add the appropriate key-value pair to the accumulator object and return the value as the accumulator.

```js
const unflattenObject = obj =>
  Object.keys(obj).reduce((res, k) => {
    k.split('.').reduce(
      (acc, e, i, keys) =>
        acc[e] ||
        (acc[e] = isNaN(Number(keys[i + 1]))
          ? keys.length - 1 === i
            ? obj[k]
            : {}
          : []),
      res
    );
    return res;
  }, {});
```

```js
unflattenObject({ 'a.b.c': 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }
unflattenObject({ 'a.b': 1, 'a.c': 2, d: 3 }); // { a: { b: 1, c: 2 }, d: 3 }
unflattenObject({ 'a.b.0': 8, d: 3 }); // { a: { b: [ 8 ] }, d: 3 }
```
