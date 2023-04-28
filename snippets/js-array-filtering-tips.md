---
title: JavaScript array filtering tips
shortTitle: Array filtering tips
type: story
tags: [javascript,array]
author: chalarangelo
cover: violin
excerpt: A few tips and tricks to help you filter arrays in JavaScript more efficiently.
dateModified: 2022-09-28T05:00:00-04:00
---

While `Array.prototype.filter()` is a very convenient method, its performance often leaves something to be desired. This is exaggerated due to the fact that it has become the go-to method for many operations that can be performed using different alternatives. Let's look at a couple of common scenarios and see how we can improve their performance.

### Find a single value

If you are looking for a single result in an array, you can use `Array.prototype.find()` instead. This will return the first element that satisfies the condition, or `undefined` if no such element exists. It's much faster than `Array.prototype.filter()`, as it will stop iterating as soon as it finds the first matching element.

```js
const arr = [1, 2, 3, 4, 5];

arr.find(x => x > 3); // 4
```

Additionally, if the condition is a simple equality check, you can also use `Array.prototype.indexOf()`. While not as pretty as the other two, it can be significantly faster, as there's no overhead from using a comparator function.

```js
const arr = [1, 2, 3, 4, 5];

arr.indexOf(3); // 2
```

### Remove a single value

Similarly, if you want to remove a single value from an array, you can use `Array.prototype.findIndex()` to find the index of the element you want to remove. Then, use `Array.prototype.slice()` to remove it. While this is a little more verbose and seems to perform more operations, it can actually be faster than using `Array.prototype.filter()` in many cases.

```js
const arr = [1, 2, 3, 4, 5];

const index = arr.findIndex(x => x === 3);
const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
// [1, 2, 4, 5]
```

Similarly, if you don't mind mutating the original array, you can use `Array.prototype.splice()` to remove the element at the index you found. As this method doesn't have to create a new array, it can be significantly faster than the previous one.

```js
const arr = [1, 2, 3, 4, 5];

const index = arr.findIndex(x => x === 3);
arr.splice(index, 1); // [1, 2, 4, 5]
```

### Additional notes

In many cases, such changes will not make a drastic difference in your application's performance. It never hurts, however, to be aware of all the options and use the best one for your specific use case. Changes such as these will make more sense when working with large datasets, as well as critical parts of your application.

Additionally, depending on the data and its constraints, it might make more sense to use a different data structure altogether. For example, if unique values are a precondition, using a `Set` is more efficient and much easier to work with in many cases.
