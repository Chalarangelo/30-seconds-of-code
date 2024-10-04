---
title: Make a JavaScript function return a promise
shortTitle: Promisify function
language: javascript
tags: [function,promises]
cover: nature-screen
excerpt: Learn how to convert an asynchronous function to return a promise in JavaScript.
listed: true
dateModified: 2024-07-29
---

Have you ever wanted to convert an asynchronous function to return a promise in JavaScript? For example, you might want to perform some I/O or use `setTimeout()` to delay the execution of a function. It's generally pretty straightforward, once you understand the basics of promises.

> [!TIP]
>
> In **Node.js 8 or newer**, you can use [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original) to do this.

In essence, we want to **wrap a function in a promise**, thus we want to create a [higher-order function](/js/s/higher-order-functions) that takes a function as an argument and returns a **new function** that returns a promise. This new function will call the original function and resolve the promise with the result.

Then, we can use variadic arguments to pass in all the arguments to the original function. This way, we can create a new function that can be called with **any number of arguments**, just like the original function.

Finally, we can use the `Promise()` constructor to create a new promise, and **call the original function with the provided arguments**. Depending on the result of the function, we can either **resolve** the promise with the result or **reject** it with an error.

```js
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); // Promise resolves after 2s
```
