---
title: What are promises in JavaScript? In which states can a promise be?
shortTitle: Promises introduction
type: question
tags: javascript,function,promise
author: chalarangelo
cover: blog_images/sail-away.jpg
excerpt: JavaScript's promises represent the eventual completion (or failure) of asynchronous operations and their resulting value.
firstSeen: 2021-10-24T05:00:00-04:00
---

The `Promise` object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. A common example of using promises would be fetching data from a URL. This would create a `Promise` object that represents the data we expect to receive. For example:

```js
fetch('https://my.api.com/items/1')
  .catch(err => console.log(`Failed with error: ${err}`))
  .then(response => response.json())
  .then(json => console.log(json));
```

The tricky part about promises is understanding that the resulting value may not initially be available. Instead, the promise can be in one of three states:

- **Pending:** initial state, neither fulfilled nor rejected.
- **Fulfilled:** meaning that the operation was completed successfully.
- **Rejected:** meaning that the operation failed.

A pending `Promise` can either be fulfilled with a value or rejected with a reason (error). When either of these happens, the associated handlers (`Promise.prototype.then()`, `Promise.prototype.catch()`) are called.

In the previous example, the `Promise` starts in a pending state, until a response from the server is received. If anything goes wrong during that time, the `Promise` will be rejected and the `Promise.prototype.catch()` handler will log the error to the console. Otherwise, the `Promise` will be fulfilled and the first `Promise.prototype.then()` handler will execute, returning itself a new `Promise`. The new promise will be fulfilled and call the second `Promise.prototype.then()` handler to log the parsed JSON data to the console.
