---
title: Walk through object
tags: object,recursion,generator
author: chalarangelo
cover: bridge
firstSeen: 2020-12-31T13:03:15+02:00
lastUpdated: 2021-11-15T13:18:18+02:00
---

Creates a generator, that walks through all the keys of a given object.

- Use recursion.
- Define a generator function, `walk`, that takes an object and an array of keys.
- Use a `for...of` loop and `Object.keys()` to iterate over the keys of the object.
- Use `typeof` to check if each value in the given object is itself an object.
- If so, use the `yield*` expression to recursively delegate to the same generator function, `walk`, appending the current `key` to the array of keys. Otherwise, `yield` an array of keys representing the current path and the value of the given `key`.
- Use the `yield*` expression to delegate to the `walk` generator function.

```js
const walkThrough = function* (obj) {
  const walk = function* (x, previous = []) {
    for (let key of Object.keys(x)) {
      if (typeof x[key] === 'object') yield* walk(x[key], [...previous, key]);
      else yield [[...previous, key], x[key]];
    }
  };
  yield* walk(obj);
};
```

```js
const obj = {
  a: 10,
  b: 20,
  c: {
    d: 10,
    e: 20,
    f: [30, 40]
  },
  g: [
    {
      h: 10,
      i: 20
    },
    {
      j: 30
    },
    40
  ]
};
[...walkThrough(obj)];
/*
[
  [['a'], 10],
  [['b'], 20],
  [['c', 'd'], 10],
  [['c', 'e'], 20],
  [['c', 'f', '0'], 30],
  [['c', 'f', '1'], 40],
  [['g', '0', 'h'], 10],
  [['g', '0', 'i'], 20],
  [['g', '1', 'j'], 30],
  [['g', '2'], 40]
]
*/
```
