---
title: Asynchronous function composition in JavaScript
shortTitle: Async function composition
language: javascript
tags: [promises,function]
cover: new-york-skyline
excerpt: Learn how to perform function composition for asynchronous functions.
listed: true
dateModified: 2024-07-27
---

If you're familiar with [function composition](/js/s/function-composition), you might have wondered how to **compose asynchronous functions** in JavaScript. While not exactly as simple, the underlying principles are the same.

## Pipe async functions

**Left-to-right** function composition for asynchronous functions can be achieved by using `Array.prototype.reduce()` and the spread operator (`...`) to perform function composition using `Promise.prototype.then()`.

The functions can return a combination of normal values, `Promise`s, or be `async`, returning through `await`. All functions must accept a **single argument**.

```js
const pipeAsync =
  (...fns) =>
  arg =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsync(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
```

## Compose async functions

**Right-to-left** function compositions for asynchronous functions can be achieved by using the lesser-used `Array.prototype.reduceRight()` in place of `Array.prototype.reduce()`. The rest of the implementation is the same.

```js
const composeAsync =
  (...fns) =>
  arg =>
    fns.reduceRight((p, f) => p.then(f), Promise.resolve(arg));

const sum = composeAsync(
  async x => (await x) + 4,
  x => x + 3,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 1
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
```
