---
title: Function property names
type: snippet
language: javascript
tags: [object,function]
cover: metro-arrival
dateModified: 2020-10-20
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
