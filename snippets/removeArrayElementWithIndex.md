---
title: removeArrayElementWithIndex
tags: array,intermediate
---

The snippet removes the specified index item from the array.

- It uses the built in Array.prototype.splice() method to remove to item.
- Array.prototype.slice() by default returns the removed the element but at the same time it manipulates the orignal array as well.
- This can be helpful while working on dynamic arrays and there is frequent addition and deletion of items.
- works with array of objects or any type of arrays as well.

```js
const removeArrayItemWithIndex = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};
```

```js
removeArrayItemWithIndex([1, 2, 3, 4], 2); // [1, 2, 4]
removeArrayItemFromIndex([{ a: 1 }, { b: 2 }, { c: 3 }], 1); // [{ a: 1 }, { c: 3 }]
```
