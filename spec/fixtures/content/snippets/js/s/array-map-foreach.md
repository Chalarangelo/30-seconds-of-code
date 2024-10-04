---
title: What is the difference between Array.prototype.map() and Array.prototype.forEach()?
shortTitle: Array.prototype.map() vs Array.prototype.forEach()
test: true
language: javascript
tags: [iteration,object]
cover: fort-lamp
excerpt: Which method do you reach for first? What are the differences between them? Let's find out!
listed: true
dateModified: 2023-03-26
---

`Array.prototype.map()` and `Array.prototype.forEach()` are both used in JS for array iteration. What are the differences? Let's see:

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(num => console.log(num * 2));
// No return value, output: 2, 4, 6, 8, 10

const doubledNumbers = numbers.map(num => num * 2);
// Returns a new array: [2, 4, 6, 8, 10]
```

`Array.prototype.map()` returns a **new array** with the results of the callback function. `Array.prototype.forEach()` represents an **iteration**.

We recommend you continue reading [here](/js/s/array-compare).
