---
title: allUnique
tags: array,beginner
---

Checks if all elements in an array are equal and returns`true` else returns `false`.

- Use `Array.prototype.length` property to return the number of elements in that array.
- Use `Set()` object to collect unique elements from the given array and then the `Set.prototype.size` to get the number of elements in the set
- Check the two values for equality

```js
const allUnique = myArray => myArray.length === new Set(myArray).size;
```

```js
allUnique([1,2,3,4,5]); // true
allUnique([1,1,2,3,4]); // false
```
