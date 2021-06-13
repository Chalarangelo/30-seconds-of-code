---
title: toHash
tags: array,intermediate
firstSeen: 2018-05-31T02:14:04+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Reduces a given array-like into a value hash (keyed data store).

- Given an iterable object or array-like structure, call `Array.prototype.reduce.call()` on the provided object to step over it and return an `Object`, keyed by the reference value.

```js
const toHash = (object, key) =>
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );
```

```js
toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }
// A more in depth example:
let users = [
  { id: 1, first: 'Jon' },
  { id: 2, first: 'Joe' },
  { id: 3, first: 'Moe' },
];
let managers = [{ manager: 1, employees: [2, 3] }];
// We use function here because we want a bindable reference, 
// but a closure referencing the hash would work, too.
managers.forEach(
  manager =>
    (manager.employees = manager.employees.map(function(id) {
      return this[id];
    }, toHash(users, 'id')))
);
managers; 
// [ {manager:1, employees: [ {id: 2, first: 'Joe'}, {id: 3, first: 'Moe'} ] } ]
```
