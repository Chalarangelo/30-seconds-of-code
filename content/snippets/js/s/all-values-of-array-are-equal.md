---
title: Check if all values of a JavaScript array are equal
shortTitle: All array values are equal
language: javascript
tags: [array]
cover: book-stopper
excerpt: Use the `Array.prototype.every()` method to check if all values of an array are equal in JavaScript.
listed: true
dateModified: 2024-02-16
---

Checking if all array elements match a condition in JavaScript is pretty simple. But how can you check if all values of an array are equal? It's just a matter of finding the right value to compare the rest of the array to.

## Comparing array elements by value

Using `Array.prototype.every()` is what comes to mind and it's the right path to go down. As we need to compare all elements to each other, we can just use the **first element** as the reference and compare the rest of the array to it.

```js
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 1, 1]); // true
allEqual([1, 1, 2]); // false
```

## Comparing array elements using a mapping function

For more complex values, such as objects, you might want to use a **mapping function** to compare the elements. This way, you can compare the elements based on a specific property or a custom comparison function.

The technique is the same as before, except that you call the mapping function on the first element and then compare the rest of the array to the result.

```js
const allEqualBy = (arr, fn) =>
  arr.every((val, i) => fn(val, i, arr) === fn(arr[0], 0, arr));

allEqualBy([{ a: 1 }, { a: 1 }, { a: 1 }], obj => obj.a); // true
allEqualBy([{ a: 1 }, { a: 1 }, { a: 2 }], obj => obj.a); // false
```
