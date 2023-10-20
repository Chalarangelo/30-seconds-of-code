---
title: Debounce a JavaScript function and return a promise
shortTitle: Debounce promise
type: tip
language: javascript
tags: [function,promise]
excerpt: Easily create a debounced function that returns a promise.
cover: chess-pawns
dateModified: 2023-10-13
---

**Debouncing** is a technique used to **limit the number of times** a function is called. We've previously seen how to [debounce a function](/js/s/debounce-function), but what if we want to **return a promise** instead?

Same as before, we can use **timeouts** to create a delay as needed. We need to **clear the current pending timeout**, using `clearTimeout()`, and **create a new timeout** with `setTimeout()` each time the debounced function is invoked. Similarly, we can use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary arguments.

However, we also need to **keep track of all pending promises** and resolve/reject them when the function is invoked. To do that, we can create a `pending` array and add the `resolve` and `reject` callbacks of each promise to it.

When **the function is invoked**, the current `pending` array will have to be copied, as it can change between the function call and its resolution. Then, we can clear the `pending` array and call the provided function.

Finally, when **the function resolves/rejects**, we can resolve/reject all promises in the copied array with the returned data. This means that **all promises created in the meantime will resolve/reject with the same data**.

```js
const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.length = 0;
        Promise.resolve(fn.apply(this, args)).then(
          data => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          error => {
            currentPending.forEach(({ reject }) => reject(error));
          }
        );
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
};
```

```js
const fn = arg => new Promise(resolve => {
  setTimeout(resolve, 1000, ['resolved', arg]);
});
const debounced = debouncePromise(fn, 200);
debounced('foo').then(console.log);
debounced('bar').then(console.log);
// Will log ['resolved', 'bar'] both times
```
