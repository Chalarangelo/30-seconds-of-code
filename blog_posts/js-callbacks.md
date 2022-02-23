---
title: What is a callback function?
type: question
tags: javascript,function
author: chalarangelo
cover: blog_images/rabbit-call.jpg
excerpt: JavaScript uses callback functions in various places for different purposes. From event listeners to asynchronous operations, they are an invaluable tool you need to master.
firstSeen: 2021-10-03T05:00:00-04:00
---

A callback function is a function passed as an argument to another function, which is then invoked inside the outer function. Callback functions are often executed once an event has occurred or a task has completed.

### Synchronous callbacks

A synchronous callback is a callback function that is executed immediately. The function passed as the first argument to `Array.prototype.map()` is a great example of a synchronous callback:

```js
const nums = [1, 2, 3];
const printDoublePlusOne = n => console.log(2 * n + 1);

nums.map(printDoublePlusOne); // LOGS: 3, 5, 7
```

### Asynchronous callbacks

An asynchronous callback is a callback function that is used to execute code after an asynchronous operation has completed. The function executed inside `Promise.prototype.then()` is a great example of an asynchronous callback:

```js
const nums = fetch('https://api.nums.org'); // Suppose the response is [1, 2, 3]
const printDoublePlusOne = n => console.log(2 * n + 1);

nums.then(printDoublePlusOne); // LOGS: 3, 5, 7
```
