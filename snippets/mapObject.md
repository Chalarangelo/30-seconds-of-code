---
title: mapObject
tags: array,object,advanced
---

Maps the values of an array to an object using a function, where the key-value pairs consist of the stringified value as the key and the mapped value.

Use `Array.prototype.map()` to convert each element in `arr` to an `Object` literal with one property.
Use `el` as the property's name (`el.toString()` will be called internally), and call the passed `fn` with `el` to derive the property's value.
Use the `spread` operator (`...`) to call `Object.assign()` with the elements of the mapped array.

```js
const mapObject = (arr, fn) => Object.assign(...arr.map(el => ({ [el]: fn(el) })));
```

```js
const squareIt = arr => mapObject(arr, a => a * a);
squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }
```