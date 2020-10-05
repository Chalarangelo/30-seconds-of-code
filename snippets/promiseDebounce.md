---
title: promiseDebounce
tags: promise,debounce,intermediate
---

Creates a debounced function that returns a promise, but delays invoking the provided function until at least `ms` milliseconds have elapsed since the last time it was invoked. All promises returned during this time will return the same data.

- Each time the debounced function is invoked, clear the current pending timeout with `clearTimeout()` and use `setTimeout()` to create a new timeout that delays invoking the function until at least `ms` milliseconds has elapsed.
- create a new `Promise` and add it's `resolve` and `reject` callback to pending promises stack.
- When `setTimeout` is called: copy current stack (as it can change between provided function call and resolve), clear it and call provided function.
- When provided function resolves/rejects, finish all promises from stack (copied when function was called) with returned data.
- Use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary arguments.
- Omit the second argument, `ms`, to set the timeout at a default of 0 ms.

```js
const promiseDebounce = (fn, ms = 0) =>
  {
    let timeoutId;
    const pending = [];

    return (...args) => new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.lenght = 0;
        Promise.resolve(fn.apply(this, args)).then(
          data => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          error => {
            currentPending.forEach(({ reject }) => reject(error));
          },
        )
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
  }
```

```js
//some function returning promise
const fn = arg => new Promise(resolve => {
    setTimeout(resolve, 1000, ['resolved', arg]);
});
const debounced = promiseDebounce(fn, 200);
debounced('foo').then(console.log);
debounced('bar').then(console.log);
// will log ['resolved', 'bar'] both times.
```
