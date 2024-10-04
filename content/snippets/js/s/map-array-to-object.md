---
title: Map a JavaScript array to an object
shortTitle: Map array to object
language: javascript
tags: [array,object]
cover: two-lighthouses
excerpt: Map the values of an array to an object, using the given mapping functions.
listed: true
dateModified: 2024-01-15
---

A fairly common task I've written code for time and time again is mapping an array to an object. This might be as simple as mapping an array of primitives to an object via a mapping function or more complex, such as mapping an array of objects to a single object. Luckily, the underlying principles of implementation are fairly similar for both cases.

## Map an array of primitives to an object

An **array of primitives** may be transformed to an object by **mapping each element to a key and value**. The key is the element itself and the value is the result of applying a mapping function to the element.

To accomplish this, we can use `Array.prototype.map()` and a **mapping function**, which is passed the element, index and array and returns the **mapped value**. The result of the mapping function is then passed to `Object.fromEntries()`, which creates an object from an array of key-value pairs.

```js
const mapObject = (arr, fn) =>
  Object.fromEntries(arr.map((el, i, arr) => [el, fn(el, i, arr)]));

mapObject([1, 2, 3], a => a * a);
// { 1: 1, 2: 4, 3: 9 }
```

## Map an array of objects to an object

Subsequently, we can extend this snippet to map an **array of objects** to an object. This is done by mapping each object to a key and value, via a **pair of mapping functions**. The first mapping function is used to map the key and the second is used to map the value.

```js
const mapObject = (arr, mapKey, mapValue = i => i) =>
  Object.fromEntries(
    arr.map((el, i, arr) => [mapKey(el, i, arr), mapValue(el, i, arr)])
  );

const people = [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ];

mapObject(people, p => p.name.toLowerCase());
// { john: { name: 'John', age: 42 }, adam: { name: 'Adam', age: 39 } }

mapObject(
  people,
  p => p.name.toLowerCase(),
  p => p.age
);
// { john: 42, adam: 39 }
```

> [!NOTE]
>
> The **order of mapping function arguments** is mere preference in this case. Feel free to switch them around, especially if you plan on using the snippet in a functional pipeline.
