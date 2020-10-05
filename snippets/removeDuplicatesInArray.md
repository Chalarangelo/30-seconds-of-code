---
title: removeDuplicatesInArray
tags: array,intermediate
---

Removes duplicate values in an array

- Use `Array.prototype.filter()` method to extract all the unique values.
- Since indexes in the array are unique, use `String.indexOf()` method which retuns the index of the first occurence of the specified value.

```js
const removeDuplicates = (array) =>
  array.filter((element, index) => {
    return array.indexOf(element) === index;
  });
```

```js
const array = ['Apple', 'Banana', 'Citrus', 'Apple', 'Banana'];
removeDuplicates(array); // '['Apple', 'Banana', 'Citrus']'
```
