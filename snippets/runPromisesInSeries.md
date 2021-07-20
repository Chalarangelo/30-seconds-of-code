---
title: runPromisesInSeries
tags: function,promise,intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Runs an array of promises in series.

- Use `Array.prototype.reduce()` to create a promise chain, where each promise returns the next promise when resolved.

```js
const runPromisesInSeries = (promiseCreators, initData) =>
    promiseCreators.reduce((promise, next) => promise.then(data => next(data)), Promise.resolve(initData));
```

```js
var promise1 = function (data = 0) {
    return new Promise(resolve => {
        resolve(data + 1000);
    });
}
var promise2 = function (data) {
    return new Promise(resolve => {
        resolve(data - 500);
    });
}

runPromisesInSeries([promise1, promise2], -100).then(res => console.log(res)); // 400
// Executes each promise sequentially, taking a total of 3 seconds to complete
```
