---
title: Map a JavaScript object to an array
shortTitle: Map object to array
language: javascript
tags: [object,array]
cover: metro-arrival
excerpt: Map an object to an object array, using the provided mapping function.
listed: true
dateModified: 2024-03-22
---

Ever wanted to **map an object to an array of objects** using a custom mapping function? This can be useful when you need to separate a dictionary-like object into individual objects, including the keys as properties.

## Convert an object to an array of objects

The simplest way to get the **key-value pairs** of an object is to use `Object.entries()`. Then, using `Array.prototype.map()` and a **mapping function**, you can map the key-value pairs to an array of objects.

```js
const listify = (obj, mapFn) =>
  Object.entries(obj).map(([key, value]) => mapFn(key, value));

const people = [
  { name: 'John', age: 42 },
  { name: 'Adam', age: 39 },
];

listify(people, (key, value) => ({ name: key, ...value }));
// [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ]
```

## Convert an array of objects to an object

Conversely, what about the opposite? You can simply use `Object.fromEntries()` to **convert an array of objects to an object**. The `mapFn` function should return a **2-element array** with the key-value pair.

```js
const delistify = (arr, mapFn) =>  Object.fromEntries(arr.map(mapFn));

const people = [
  { name: 'John', age: 42 },
  { name: 'Adam', age: 39 },
];

delistify(people, (obj) => {
  const { name, ...rest } = obj;
  return [name, rest];
});
// { John: { age: 42 }, Adam: { age: 39 } }
```
