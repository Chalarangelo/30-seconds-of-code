---
title: Unwind object
type: snippet
language: javascript
tags: [object]
cover: orange-coffee
dateModified: 2022-04-18
---

Produces an array of objects from an object and one of its array-valued properties.

- Use object destructuring to exclude the key-value pair for the specified `key` from the object.
- Use `Array.prototype.map()` for the values of the given `key` to create an array of objects.
- Each object contains the original object's values, except for `key` which is mapped to its individual values.

```js
const unwind = (key, obj) => {
  const { [key]: _, ...rest } = obj;
  return obj[key].map(val => ({ ...rest, [key]: val }));
};
```

```js
unwind('b', { a: true, b: [1, 2] }); // [{ a: true, b: 1 }, { a: true, b: 2 }]
```
