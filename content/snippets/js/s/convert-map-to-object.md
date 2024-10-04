---
title: How can I convert a Map to a JavaScript object and vice versa?
shortTitle: Map to object
language: javascript
tags: [object]
cover: yellow-shoes
excerpt: Learn how to convert between `Map`s and objects in JavaScript.
listed: true
dateModified: 2024-02-11
---

Oftentimes, when working with `Map` objects, we need to convert from or to plain JavaScript objects. This can be useful when you need to use the `Map`'s key-value pairs as an object or vice versa.

## Convert a Map to an object

Using `Map.prototype.entries()`, we can convert a `Map` to an **array of key-value pairs**. Then, we can use `Object.fromEntries()` to convert the **array to an object**.

```js
const mapToObject = map => Object.fromEntries(map.entries());

mapToObject(new Map([['a', 1], ['b', 2]])); // {a: 1, b: 2}
```

## Convert an object to a Map

Similarly, using `Object.entries()`, we can convert an object to an **array of key-value pairs**. Then, we can use the `Map()` constructor to **convert the array to a Map**.

```js
const objectToMap = obj => new Map(Object.entries(obj));

objectToMap({a: 1, b: 2}); // Map {'a' => 1, 'b' => 2}
```
