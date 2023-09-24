---
title: Iterable to hash
type: snippet
language: javascript
tags: [array]
cover: pink-flower-tree
dateModified: 2022-01-30
---

Reduces a given iterable into a value hash (keyed data store).

- Use `Object.values()` to get the values of the iterable (object or array).
- Use `Array.prototype.reduce()` to iterate over the values and create an object, keyed by the reference value.

```js
const toHash = (object, key) =>
  Object.values(object).reduce((acc, data, index) => {
    acc[!key ? index : data[key]] = data;
    return acc;
  }, {});
```

```js
toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }
```
