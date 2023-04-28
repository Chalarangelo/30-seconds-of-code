---
title: Remove an element from a JavaScript array
shortTitle: Remove element from array
type: story
tags: [javascript,array]
author: chalarangelo
cover: maple-leaf-palette
excerpt: Did you know there are multiple ways to remove an element from an array? Let's take a look.
dateModified: 2022-06-26T05:00:00-04:00
---

Removing a specific value or values from an array in JavaScript is a pretty common task. While not hard to accomplish, there are a few approaches available, each with their own pros and cons. Choosing the correct one ultimately depends on the use case.

### Array.prototype.splice()

This is probably the most common approach for removing elements from an array. While `Array.prototype.splice()` is a very versatile tool in your kit, you need to remember that it **mutates the original array**. On top of that, it returns the deleted elements instead of a new array.

```js
const arr = ['a', 'b', 'c'];
const deleted = arr.splice(1, 1); // ['b']

console.log(arr); // ['a', 'c']
```

If you're cool with mutating the array, `Array.prototype.splice()` might just be the solution you need.

### Array.prototype.filter()

Another option for removing elements from an array is `Array.prototype.filter()`. More versatile than `Array.prototype.splice()`, it **doesn't mutate the original array**, but instead returns a new one. However, there's a performance consideration to be made for larger arrays when the elements to be removed are only encountered once. `Array.prototype.filter()` will always iterate over all elements in the array, which might be impractical in some cases.

```js
const arr = ['a', 'b', 'c'];
const filtered = arr.filter(el => el !== 'b'); // ['a', 'c']

console.log(arr); // ['a', 'b', 'c']
```

Most of the time, `Array.prototype.filter()` is the best option for removing elements from an array.

### Alternative options

The previous two options should cover the vast majority of use cases. Yet, there are some other options available for removing elements from an array, which might be preferable in certain cases. For example, if you like the interface of `Array.prototype.splice()` but need immutability, the [shank snippet](/js/s/shank) might be the solution for you. Similarly, when working with large unsorted arrays, there's a [fast removal trick](/articles/s/js-fast-remove-array-element) that might be of interest to you.

