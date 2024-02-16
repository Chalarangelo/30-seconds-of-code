---
title: Can I freeze a Set or Map in JavaScript?
shortTitle: Freeze Set or Map
type: question
language: javascript
tags: [array]
cover: reflection-on-lake
excerpt: Learn how to create a frozen `Set` or `Map` in JavaScript.
dateModified: 2024-02-15
---

Freezing an object is rather simple, using `Object.freeze()`. However, when it comes to freezing a `Set` or `Map`, things get a bit more complicated. The `Set` and `Map` objects have their own methods for adding, deleting and clearing elements, which can be problematic when trying to freeze them.

Luckily, as they're objects after all, you can easily **override these methods** to prevent them from being used.

## Freeze a `Set` object

In order to freeze a `Set` object, you can simply set the `Set.prototype.add()`, `Set.prototype.delete()` and `Set.prototype.clear()` methods to `undefined`. This will effectively prevent them from being used, practically freezing the object. In addition to that, you can use `Object.freeze()` to freeze the `Set` object itself.

```js
const frozenSet = iterable => {
  const s = new Set(iterable);
  s.add = undefined;
  s.delete = undefined;
  s.clear = undefined;
  return Object.freeze(s);
};

frozenSet([1, 2, 3, 1, 2]);
/* Set {
  1, 2, 3,
  add: undefined, delete: undefined, clear: undefined
} */
```

## Freeze a `Map` object

Freezing a `Map` object is very similar to freezing a `Set` object. You can set the `Map.prototype.set()`, `Map.prototype.delete()` and `Map.prototype.clear()` methods to `undefined` and then use `Object.freeze()` to freeze the `Map` object itself.

```js
const frozenMap = iterable => {
  const m = new Map(iterable);
  m.set = undefined;
  m.delete = undefined;
  m.clear = undefined;
  return Object.freeze(m);
};

frozenMap([['a', 1], ['b', 2]]);
/* Map {
  'a' => 1, 'b' => 2,
  set: undefined, delete: undefined, clear: undefined
} */
```
