---
title: What is the difference between then and finally in a JavaScript promise?
shortTitle: Promise then vs finally
type: question
tags: javascript,function,promise
author: chalarangelo
cover: blue-sunrise
excerpt: On the surface, a JavaScript promise's `then` and `finally` methods seem very similar. But there are a few important differences you need to keep in mind.
firstSeen: 2021-03-18T11:00:00+02:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

On the surface, `Promise.prototype.then()` and `Promise.prototype.finally()` seem very similar. But there are a few important differences you need to keep in mind.

The first and most obvious one is that `finally()` doesn't receive the resulting value of the promise chain. On the same note, as no value is received by `finally()`, the resolved value of the promise can't be changed as well.

```js
new Promise((resolve, reject) => resolve(10))
  .then(x => {
    console.log(x); // 10
    return x + 1;
  })
  .finally(x => {
    console.log(x); // undefined
    return x + 2;
  });
// Promise resolves to 11, the return value of then()
```

Another difference is related to error handling and how the promise chain is resolved. Sometimes, you might want to defer catching an error in the promise chain, allowing you to handle them elsewhere. In this case, a chained `then()` will not be executed, whereas `finally()` will. Moreover, if a previous `catch()` throws, you end up in the same situation.

```js
new Promise((resolve, reject) => reject(0))
  .catch(x => {
    console.log(x); // 0
    throw x;
  })
  .then(x => {
    console.log(x); // Will not run
  })
  .finally(() => {
    console.log('clean up'); // 'clean up'
  });
// Uncaught (in promise) 0
```

The takeaway here is that you shouldn't substitute `then()` and `finally()` unless there is a very specific reason to do so. As a rule of thumb, `finally()` should be used for cleaning up (clearing timeouts, nulling references, resetting UI state etc.).
