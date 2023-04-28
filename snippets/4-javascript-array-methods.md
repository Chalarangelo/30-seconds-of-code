---
title: 4 JavaScript Array methods you must know
shortTitle: Useful array methods
type: story
tags: [javascript,array,cheatsheet]
author: chalarangelo
cover: arrays
excerpt: JavaScript arrays have a very robust API offering a plethora of amazing tools. Learn the 4 must-know JavaScript array methods in this quick guide.
dateModified: 2021-06-12T19:30:41+03:00
---

JavaScript arrays have a very robust API offering a plethora of amazing tools. Here are our top 4 JavaScript array methods every developer should know:

### Array.prototype.map()

[`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) creates a new array by applying the provided transformation to each element of the original array. The result is an array with the same length as the original array and elements transformed based on the provided function.

```js
const arr = [1, 2, 3];
const double = x => x * 2;
arr.map(double); // [2, 4, 6]
```

### Array.prototype.filter()

[`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) creates a new array by using a filtering function to keep only elements that return `true` based on that function. The result is an array with equal or less than the original array's length, containing a subset of the same elements as the original array.

```js
const arr = [1, 2, 3];
const isOdd = x => x % 2 === 1;
arr.filter(isOdd); // [1, 3]
```

![JavaScript Array Methods](./illustrations/js-array-methods.png)

### Array.prototype.reduce()

[`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) creates an output value of any type depending on a reducer function and an initial value. The result can be of any type such as an integer, an object or an array, based on the reducer function provided.

```js
const arr = [1, 2, 3];

const sum = (x, y) => x + y;
arr.reduce(sum, 0); // 6

const increment = (x, y) => [...x, x[x.length - 1] + y];
arr.reduce(increment, [0]); // [0, 1, 3, 6]
```

### Array.prototype.find()

[`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) returns the first element for which a matcher function returns `true`. The result is a single element from the original array.

```js
const arr = [1, 2, 3];
const isOdd = x => x % 2 === 1;
arr.find(isOdd); // 1
```
