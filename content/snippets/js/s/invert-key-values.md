---
title: Invert the key-value pairs of a JavaScript object
shortTitle: Invert key-values
language: javascript
tags: [object]
cover: pineapple-on-green
excerpt: Learn how to invert the key-value pairs of an object in JavaScript.
listed: true
dateModified: 2024-06-09
---

While fairly uncommon, inverting the key-value pairs of an object can be useful in certain scenarios. In its simplest form, this is only possible if the values of the object are unique. This is because the values of the original object will become the keys of the inverted object, and if there are duplicate values, they will overwrite each other.

## Invert unique key-value pairs

Given that the values of the object are **unique**, you can use `Object.entries()` to get an array of key-value pairs, `Array.prototype.map()` to reverse them, and `Object.fromEntries()` to create a new object from the **inverted pairs**.

```js
const invertKeyValues = obj =>
  Object.fromEntries(
    Object.entries(obj).map(entry => entry.reverse())
  );

invertKeyValues({ a: 1, b: 2, c: 3 });
// { 1: 'a', 2: 'b', 3: 'c' }
invertKeyValues({ a: 1, b: 2, c: 1 });
// { 1: 'c', 2: 'b' }
```

## Invert key-value pairs with duplicates

If the values of the object contain **duplicates**, you'll have to handle them a little differently. Instead of overwriting the keys in the inverted object, you can **append them to an array**. This way, you can keep track of all the keys that share the same value.

```js
const invertKeyValues = obj =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

invertKeyValues({ a: 1, b: 2, c: 1 });
// { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1, d: 2 });
// { 1: [ 'a', 'c' ], 2: [ 'b', 'd' ] }
```
