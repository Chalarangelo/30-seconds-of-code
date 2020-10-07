---
title: removePrimitive
tags: array,intermediate
---

Removes the first encountered primitive in an array.

- Uses Array.prototype.includes() and Array.prototype.indexOf() to check if primitive exists
- Uses Array.prototype.splice() in combination with Array.prototype.indexOf() to operate on the array in place
- Calling this method without specifying a 2nd parameter will remove the first undefined element (if present)

```js
const removePrimitive = (arr, primitive) => {
  if (Array.isArray(arr) && arr.indexOf(primitive) !== -1) {
    arr.splice(arr.indexOf(primitive), 1)
  };
};
```

```js
removePrimitive([0, 1, true, false], true); // [0, 1, false]
removePrimitive(['shizzle', null, undefined], ); // [['shizzle', null]]
```
