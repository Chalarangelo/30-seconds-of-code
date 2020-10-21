---
title: RemoveArrayElement
tags: array,beginner
---

Removes the first occurrence of a specified element from an array
- Uses `Array.prototype.indexOf()` to found the element index
- Uses `Array.prototype.slice()` to remove the that element

```js
const removeArrayElement = (arr, element) => {
  const index = arr.indexOf(element)
  if(index >= 0){
    arr.splice(index, 1);
  }
  return arr;
}
```

```js
removeArrayElement(['a', 'b', 'c'], 'b'); // ['a', 'c']
removeArrayElement(['a', 'b', 'c'], 'r'); // ['a', 'b', 'c']
removeArrayElement(['a', 'b', 'b'], 'b'); // ['a', 'b']
```
