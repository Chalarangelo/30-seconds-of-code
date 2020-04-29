---
title: pipeAsyncFunctions
tags: function,promise,intermediate
---

Performs left-to-right function composition for asynchronous functions.

Use `Array.prototype.reduce()` and the spread operator (`...`) to perform function composition using `Promise.then()`.
The functions can return a combination of normal values, `Promise`s or be `async`, returning through `await`.
All functions must accept a single argument.

```js
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
```

```js

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async() => {
  console.log(await sum(5)); // 15 (after one second)
})();
```
