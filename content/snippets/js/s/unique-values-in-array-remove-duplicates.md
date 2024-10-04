---
title: Get all unique values in a JavaScript array & remove duplicates
shortTitle: Unique array values
language: javascript
tags: [array]
cover: architectural
excerpt: Easily remove duplicates from a JavaScript array using the built-in `Set` object, and learn a few other tricks along the way.
listed: true
dateModified: 2024-01-05
---

Removing duplicates from an array in JavaScript can be done in a variety of ways, such as using `Array.prototype.reduce()`, `Array.prototype.filter()` or even a simple `for` loop. But there's a much simpler way to do it, using the built-in `Set` object.

## Get all unique values in an array

A `Set` **cannot contain duplicate values** and can be easily initialized from the values of an array. Then, as it is **iterable** in itself, we can use the spread operator (`...`) to convert it back to an array of just the unique values.

```js
const uniqueElements = arr => [...new Set(arr)];

uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```

## Check if an array contains duplicates

`Set` doesn't have a `length` property, but it does have a `size` property, instead. We can use this to check if an array contains duplicates.

```js
const hasDuplicates = arr => arr.length !== new Set(arr).size;

hasDuplicates([1, 2, 2, 3, 4, 4, 5]); // true
hasDuplicates([1, 2, 3, 4, 5]); // false
```

Inverting the condition, we can check if all the values of an array are distinct.

```js
const allDistinct = arr => arr.length === new Set(arr).size;

allDistinct([1, 2, 2, 3, 4, 4, 5]); // false
allDistinct([1, 2, 3, 4, 5]); // true
```

## Remove array values that appear more than once

If we want to keep only values that are not duplicated, we can use the `Array.prototype.filter()` method. Elements that appear more than once have to appear in **at least two different indexes**, so we can use `Array.prototype.indexOf()` and `Array.prototype.lastIndexOf()` to check for this. If we expect the array to have many duplicate values, creating a `Set` from it first may improve performance.

```js
const removeNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

removeNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```

We can also do the opposite, and remove all values that appear only once. In this case the two indices have to be the same. Notice that using a `Set` for this operation will drop duplicates from the result.

```js
const removeUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

removeUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
```

## Using a function to find duplicates

More complex data, such as objects, can't be compared using equality comparison, so we need to use a function to check for duplicates. `Set` objects are not much use here, so we can use `Array.prototype.reduce()` and `Array.prototype.some()` to manually populate a new array with only the unique values. Using array methods, we can also check if an array contains duplicates, or remove all values that appear more than once.

```js
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

const hasDuplicatesBy = (arr, fn) =>
  arr.length !== new Set(arr.map(fn)).size;

const removeNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

const data = [
  { id: 0, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' },
  { id: 1, value: 'd' },
  { id: 0, value: 'e' }
];
const idComparator = (a, b) => a.id == b.id;
const idMap = a => a.id;

uniqueElementsBy(data, idComparator);
// [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
hasDuplicatesBy(data, idMap); // true
removeNonUniqueBy(data, idComparator);  // [ { id: 2, value: 'c' } ]
```
