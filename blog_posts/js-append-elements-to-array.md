---
title: Append elements to a JavaScript array
shortTitle: Append elements to array
type: story
tags: javascript,array
author: chalarangelo
cover: blog_images/switzerland-night.jpg
excerpt: Have you ever tried appending elements to an array in JavaScript? Here's a primer on all the available options.
firstSeen: 2022-07-10T05:00:00-04:00
---

Appending a value or values from an array in JavaScript is a pretty common task. While not hard to accomplish, there are a few approaches available, each with their own pros and cons. Choosing the correct one ultimately depends on the use case.

### Array.prototype.push()

The classical way to append elements to the end of an array is to use `Array.prototype.push()`. While versatile, you need to remember that it **mutates the original array**. On the flip side, it supports adding multiple elements at once. Finally, the return value of `Array.prototype.push()` is the new length of the array.

```js
const arr = ['a', 'b', 'c'];
arr.push('d', 'e'); // Returns 5 (new length after appending 2 elements)
// arr = ['a', 'b', 'c', 'd', 'e']
```

### Array.prototype.unshift()

Similar to `Array.prototype.push()`, `Array.prototype.unshift()` appends elements to the start of an array. Furthermore, this method also **mutates the original array** and supports adding multiple elements at once.

```js
const arr = ['a', 'b', 'c'];
arr.unshift('d', 'e'); // Returns 5 (new length after appending 2 elements)
// arr = ['d', 'e', 'a', 'b', 'c']
```

### Array.prototype.splice()

`Array.prototype.splice()` is more often used for removing elements from an array, but it can append elements, too. While it also **mutates the original array**, it can append elements anywhere in the array. Similar to previous methods, it supports adding more than one element at once. The return value of this method is practically meaningless in this use-case.

```js
const arr = ['a', 'b', 'c'];
arr.splice(1, 0, 'd', 'e');
// arr = ['a', 'd', 'e', 'b', 'c']
```

### Array.prototype.length

Appending an element to the end of an array means setting a value for an index equal to its length. This is due to arrays in JavaScript being zero-indexed. Luckily, `Array.prototype.length` can be combined with array index notation to accomplish this. Same as previous methods, this approach **mutates the original array**. Additionally, it's limited to adding one element at a time and only at the end of the array.

```js
const arr = ['a', 'b', 'c'];
arr[arr.length] = 'd';
// arr = ['a', 'b', 'c', 'd']
```

### Array.prototype.concat()

The first option that **doesn't mutate the original array** is `Array.prototype.concat()`. This method returns a new array with the elements of the original array and new elements concatenated to it. It can be used to append elements to either end of the array, while also supporting adding multiple elements at once.

```js
const arr = ['a', 'b', 'c'];
const arr2 = arr.concat('d', 'e');
// arr = ['a', 'b', 'c'], arr2 = ['a', 'b', 'c', 'd', 'e']
const arr3 = ['d', 'e'].concat(...arr);
// arr = ['a', 'b', 'c'], arr3 = ['d', 'e', 'a', 'b', 'c']
```

### Spread operator

Finally, the last option that **doesn't mutate the original array** is the spread operator (`...`). The way that it works is essentially the same as `Array.prototype.concat()`, supporting appending one or more elements to either end of the array.

```js
const arr = ['a', 'b', 'c'];
const arr2 = [...arr, 'd', 'e'];
// arr = ['a', 'b', 'c'], arr2 = ['a', 'b', 'c', 'd', 'e']
const arr3 = ['d', 'e', ...arr];
// arr = ['a', 'b', 'c'], arr3 = ['d', 'e', 'a', 'b', 'c']
```
