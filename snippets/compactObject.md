---
title: compactObject
tags: object,array,recursion,advanced
firstSeen: 2020-11-27T13:57:41+02:00
lastUpdated: 2020-11-27T13:57:41+02:00
---

Deeply removes all falsy values from an object or array.

- Use recursion.
- Initialize the iterable data, using `Array.isArray()`, `Array.prototype.filter()` and `Boolean` for arrays in order to avoid sparse arrays.
- Use `Object.keys()` and `Array.prototype.reduce()` to iterate over each key with an appropriate initial value.
- Use `Boolean` to determine the truthiness of each key's value and add it to the accumulator if it's truthy.
- Use `typeof` to determine if a given value is an `object` and call the function again to deeply compact it.

```js
const compactObject = val => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === 'object' ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};
```

```js
const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: '',
  g: 'a',
  h: [null, false, '', true, 1, 'a'],
  i: { j: 0, k: false, l: 'a' }
};
compactObject(obj);
// { c: true, e: 1, g: 'a', h: [ true, 1, 'a' ], i: { l: 'a' } }
```
