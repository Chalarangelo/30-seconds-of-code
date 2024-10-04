---
title: Run JavaScript promises in series
shortTitle: Run promises in series
language: javascript
tags: [promises,function]
cover: sail-away
excerpt: Learn how to resolve promises one after another (sequentially) in JavaScript.
listed: true
dateModified: 2023-10-15
---

JavaScript **promises are asynchronous**, meaning that they are executed in parallel. This is great for performance, but sometimes you need to execute promises one after another (**sequentially**). This can be easily accomplished by **chaining promises** together, using `Array.prototype.reduce()`. Each promise in the chain returns the next promise when resolved, using `Promise.prototype.then()`.

```js
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// Executes each promise sequentially, taking a total of 3 seconds to complete
```
