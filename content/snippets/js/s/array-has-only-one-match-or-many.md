---
title: Check if a JavaScript array has only one or many matches
shortTitle: Array has only one or many matches
language: javascript
tags: [array]
cover: interior-10
excerpt: Learn how to check if an array has one or more values matching the given function, and how to find the matching elements.
listed: true
dateModified: 2024-01-30
---

Finding values in an array that match a given condition is one of the most common tasks when it comes to working with arrays. Luckily, JavaScript's `Array` methods never cease to be of help, allowing to easily perform such operations.

## Check if an array has only one match

Using `Array.prototype.filter()` and `Array.prototype.length`, you can easily check if an array has only one value matching the given function.

```js
const hasOne = (arr, fn) => arr.filter(fn).length === 1;

hasOne([1, 2], x => x % 2); // true
hasOne([1, 3], x => x % 2); // false
```

## Find the index of the only matching element

To find the index of the only matching element, you can use `Array.prototype.findIndex()`.

```js
const findIndex = (arr, fn) => arr.findIndex(fn);

findIndex([1, 2, 3, 4], x => x % 2); // 0
findIndex([2, 4, 6, 8], x => x % 2); // -1
```

## Check if an array has many matches

In order to check if an array has more than one value matching the given function, you can use the same approach. The only difference is that you need to change the comparison operator from `===` to `>`.

```js
const hasMany = (arr, fn) => arr.filter(fn).length > 1;

hasMany([1, 3], x => x % 2); // true
hasMany([1, 2], x => x % 2); // false
```

## Find all indexes of the matching elements

Finding the indexes of all matching elements is a little more involved. You need to use `Array.prototype.reduce()` to loop over elements and store the indexes of matching elements.

```js
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
indexOfAll([1, 2, 3], 4); // []
```
