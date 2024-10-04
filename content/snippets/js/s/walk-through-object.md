---
title: Walk through a JavaScript object depth-first
shortTitle: Depth-first walk through object
language: javascript
tags: [object,recursion,generator]
cover: bridge
excerpt: Create a generator that walks through all the keys of a given object.
listed: true
dateModified: 2024-06-05
---

Given an **object with deeply nested keys**, walking through its **leaf nodes** is a non-trivial task. Supposing that we want to visit each key in a **depth-first manner**, we can code a **generator function** to achieve this, by recursively visiting each key and its children.

To walk through a JavaScript object depth-first, you need to use a `for...of` loop and `Object.keys()` to iterate over the keys of the object. You can then use `typeof` to check if each value in the given object is itself an object.

If so, you can use the `yield*` expression to **recursively delegate to the same generator function**, appending the current key to the array of keys. Otherwise, you can `yield` an array of keys representing the current path and the value of the given key.

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
