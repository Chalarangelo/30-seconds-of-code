---
title: Unwind a JavaScript object
shortTitle: Unwind object
language: javascript
tags: [object]
cover: orange-coffee
excerpt: Create an array of objects from an object and one of its array-valued properties.
listed: true
dateModified: 2024-06-07
---

Given an **object with an array-valued property**, you might want to **unwind** it into an array of objects. This is a common operation when working with data that has been aggregated or grouped.

For starters, you have to exclude the key-value pair for the specified `key` from the object. You can use **object destructuring** for this purpose. Then, you can use `Array.prototype.map()` for the values of the given `key` to create an **array of objects**. Each object contains the original object's values, except for `key` which is mapped to its individual values.

```js
const unwind = (key, obj) => {
  const { [key]: _, ...rest } = obj;
  return obj[key].map(val => ({ ...rest, [key]: val }));
};

unwind('b', { a: true, b: [1, 2] });
// [{ a: true, b: 1 }, { a: true, b: 2 }]
```
