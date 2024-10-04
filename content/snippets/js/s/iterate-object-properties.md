---
title: Iterate over a JavaScript object's own properties
shortTitle: Iterate over object properties
language: javascript
tags: [object]
cover: building-facade
excerpt: Iterate over all own properties of an object, running a callback for each one.
listed: true
dateModified: 2024-01-16
---

`Array.prototype.forEach()` is a great way to iterate over an array, but it doesn't work for objects. However, with a little help from `Object.keys()`, we can easily create our own **object property iterator**.

## Iterate over object properties

As mentioned already, we simply need to use `Object.keys()` to get all the properties of the object and then use `Array.prototype.forEach()` to run the provided function for each key-value pair. The callback should receive **three arguments** - the value, the key and the object itself.

```js
const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

forOwn({ foo: 'bar', a: 1 }, v => console.log(v));
// Logs: 'bar', 1
```

## Iterate over object properties in reverse

If you need to iterate over the object properties in reverse, you can use `Array.prototype.reverse()` to reverse the order of the keys before iterating over them.

```js
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v));
// Logs: 1, 'bar'
```

> [!WARNING]
>
> The **order of the resulting keys** may not match the order of the original keys, as JavaScript **objects are unordered**. All examples in this article assume that the original order is preserved.
