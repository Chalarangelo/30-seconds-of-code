---
title: mapObject
tags: array,object,intermediate
---

Maps the elements of an array to an object using functions, where the key-value pairs consist of the result of the key function as the key and the result of the value function as the value. By default, for both (key and value), the element of the array is taken.

- Use `Array.prototype.reduce()` to apply `fn` to each element in `arr` and combine the results into an object.
- Use the result of `valueFn` as the value and the result of `keyFn` as the key.
- By default, `el` is taken for the key and the value.

```js
const mapObject = (arr, valueFn = (el) => el, keyFn = (el) => el) =>
  arr.reduce((acc, el, i) => {
    acc[keyFn(el, i, arr)] = valueFn(el, i, arr);
    return acc;
  }, {});
```

```js
mapObject([1, 2, 3], (a) => a * a); // { 1: 1, 2: 4, 3: 9 }

mapObject(
  [
    { name: "key1", someBoolean: true },
    { name: "key2", someBoolean: false },
  ],
  (el) => el.someBoolean,
  (el) => el.name
); // { key1: true, key2: false }
```
