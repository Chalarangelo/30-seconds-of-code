---
title: How can I check if a JavaScript array includes a specific value?
shortTitle: JavaScript array includes value
type: question
tags: [javascript,array]
author: chalarangelo
cover: bridge-drop
excerpt: Checking if an array includes a specific value is pretty straightforward, except when it comes to objects.
dateModified: 2022-09-18T05:00:00-04:00
---

### Primitive values

You can use `Array.prototype.includes()` to check if an array contains a primitive value. This is the most convenient option when working with strings, numbers, booleans, symbols, `null` or `undefined`. You can even specify an index as a secondary parameter to start searching from.

```js
const array = [1, 2, 3, 4, 5];

array.includes(3); // true
array.includes(6); // false
array.includes(3, 3); // false
```

### Objects

Unlike primitive values, you can't use `Array.prototype.includes()` to check if an array includes an object. This comes down to how JavaScript compares values and the fact that [objects are reference types](/articles/s/javascript-pass-by-reference-or-pass-by-value). I highly recommend reading the previous article about [object comparison](/articles/s/javascript-object-comparison), as I won't be going into detail on how to compare objects here.

Due to this difference between primitive values and objects, you can't use `Array.prototype.includes()` to check if an array includes an object. However, provided you implement a [deep equality function](/js/s/equals), you can use `Array.prototype.some()` to check if any object matches the shape of another object.

```js
const array = [{ a: 1 }, { a: 2 }, { a: 3 }];

const equals = (a, b) => Object.keys(a).every(key => a[key] === b[key]);

array.some(item => equals(item, { a: 2 })); // true
array.some(item => equals(item, { a: 4 })); // false
```
