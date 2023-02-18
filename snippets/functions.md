---
title: Function property names
tags: object,function
cover: palm-tree-house
firstSeen: 2018-01-11T21:18:58+02:00
lastUpdated: 2020-10-20T11:21:07+03:00
---

Gets an array of function property names from own (and optionally inherited) enumerable properties of an object.

- Use `Object.keys()` to iterate over the object's own properties.
- If `inherited` is `true`, use `Object.getPrototypeOf()` to also get the object's inherited properties.
- Use `Array.prototype.filter()` to keep only those properties that are functions.
- Omit the second argument, `inherited`, to not include inherited properties by default.

```js
const functions = (obj, inherited = false) =>
  (inherited
    ? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
    : Object.keys(obj)
  ).filter(key => typeof obj[key] === 'function');
```

```js
function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;
functions(new Foo()); // ['a', 'b']
functions(new Foo(), true); // ['a', 'b', 'c']
```
