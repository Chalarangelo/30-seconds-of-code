---
title: 3 ways to use the JavaScript spread operator with arrays
shortTitle: Array tricks using the spread operator
type: story
tags: javascript,array
expertise: beginner
author: chalarangelo
cover: blog_images/succulent-crowd.jpg
excerpt: JavaScript’s spread operator is a very versatile tool. Here are some simple ways to use it.
firstSeen: 2022-04-17T05:00:00-04:00
---

### Clone an array

The spread operator can be used to clone an array into a new array. This trick can come in handy when working with arrays of primitives. However, it only shallow clones the array, meaning nested non-primitive values will not be cloned.

```js
const arr = [1, 2, 3];
const arr2 = [...arr];
// [1, 2, 3]
```

### Merge multiple arrays

Using the spread operator, it’s possible to combine two or more arrays into one. You should think of this trick as cloning two arrays into a new one. Due to that, the shallow cloning limitation mentioned previously applies here, too.

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]
```

### Add items to an array

Similarly to previous tricks, it’s possible to spread an array into a new one and add individual elements, too. This can also be combined with merging multiple arrays, if desired.

```js
const arr = [1, 2, 3];
const arr2 = [0, ...arr, 4];
// [0, 1, 2, 3, 4]
```
