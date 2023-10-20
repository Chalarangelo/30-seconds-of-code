---
title: Iterate over a JavaScript array from right to left
shortTitle: Iterate over array in reverse
type: tip
language: javascript
tags: [array]
cover: interior-6
excerpt: Learn how to execute a function for each element of an array, starting from the last one.
dateModified: 2023-10-10
---

`Array.prototype.forEach()` is pretty convenient, but what if you want to iterate over an array from right to left? Using a `for` loop is an option, but there are more elegant tools at our disposal.

**Reversing an array** can be easily accomplished using `Array.prototype.reverse()`, but it mutates the original array. In order to avoid that, we have to create a **shallow clone**, using `Array.prototype.slice()`. This needs to be done prior to reversing to avoid the original array being mutated. Finally, we can use `Array.prototype.forEach()` to **iterate over the reversed array**.

```js
const forEachRight = (arr, callback) =>
  arr.slice().reverse().forEach(callback);

forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```
