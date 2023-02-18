---
title: What is the difference between Array.prototype.map() and Array.prototype.forEach()?
shortTitle: Array.prototype.map() vs Array.prototype.forEach()
type: question
tags: javascript,array
author: chalarangelo
cover: fort-lamp
excerpt: Which method do you reach for first? What are the differences between them? Let's find out!
firstSeen: 2023-03-26T05:00:00-04:00
---

`Array.prototype.map()` and `Array.prototype.forEach()` are two of the most commonly used methods in JavaScript. Both of them iterate over an array and perform some action on each element. Yet, they're not the same and they're not interchangeable.

The key difference between the two lies in the **return value**. The return value of `Array.prototype.map()` is a new array with the results of the callback function. On the other hand, the return value of `Array.prototype.forEach()` is `undefined`.

Simply put, `Array.prototype.forEach()` is used to perform some action on each element in an array, while `Array.prototype.map()` is used to create a new array based on the elements in the original array. Let's take a look at an example to clear up any confusion:

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(num => console.log(num * 2));
// No return value, output: 2, 4, 6, 8, 10

const doubledNumbers = numbers.map(num => num * 2);
// Returns a new array: [2, 4, 6, 8, 10]
```

The way I like to distinguish them is by remembering that `Array.prototype.map()` represents a **transformation**, whereas `Array.prototype.forEach()` represents an **iteration**. Hopefully, one of these explanations will click for you and help you remember the difference between the two.

As a closing note, I would like to remind you that the humble `for` loop can be more efficient in some cases, such as [breaking out of a loop early](/articles/s/javascript-for-loop-early-break). Always pick the right tool for the job, as ES6 has a method for almost every use case.
