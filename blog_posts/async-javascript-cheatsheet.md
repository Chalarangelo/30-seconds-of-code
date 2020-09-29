---
title: Asynchronous JavaScript Cheat Sheet
type: cheatsheet
tags: javascript,function,promise
authors: chalarangelo
cover: blog_images/green-plant.jpg
excerpt: Learn everything you need to know about promises and asynchronous JavaScript with this handy cheatsheet.
---

### Promise basics

- **Promises** start in a **pending state**, neither fullfiled or rejected.
- When the operation is completed, a promise will become **fullfiled with a value**.
- If the operation fails, a promise will get **rejected with an error**.

### Creating promises

- The function passed to a `new Promise` will execute synchronously.
- Use `resolve()` or `reject()` to create promises from values.
- `Promise.resolve(val)` will fulfill the promise with `val`.
- `Promise.reject(err)` will reject the promise with `err`.
- If you put a fulfilled promise into a fulfilled promise, they will collapse into one.

```js
// Resolving with a value, rejecting with an error
new Promise((resolve, reject) => {
  performOperation((err, val) => {
    if (err) reject(err);
    else resolve(val);
  });
});

// Resolving without value, no need for reject
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
```

### Handling promises

- `Promise.prototype.then()` accepts two optional arguments (`onFulfilled`, `onRejected`).
- `Promise.prototype.then()` will call `onFulfilled` once the promise is fulfilled.
- `Promise.prototype.then()` will call `onRejected` if the promise is rejected.
- `Promise.prototype.then()` passes errors through if `onRejected` in undefined.

- `Promise.prototype.catch()` accepts one argument (`onRejected`).
- `Promise.prototype.catch()` behaves like `Promise.prototype.then()` when `onFulfilled` is omitted.
- `Promise.prototype.catch()` passes fulfilled values through.

- `Promise.prototype.finally()` accepts one argument (`onFinally`).
- `Promise.prototype.finally()` calls `onFinally` with no arguments once any outcome is available.
- `Promise.prototype.finally()` passes through input promise.

```js
promisedOperation()
  .then(
    val => value + 1,   // Called once the promise is fulfilled
    err => {            // Called if the promise is rejected
      if (err === someKnownErr) return defaultVal;
      else throw err;
    }
  )
  .catch(
    err => console.log(err); // Called if the promise is rejected
  )
  .finally(
    () => console.log('Done'); // Called once any outcome is available
  );
```

- All three of the above methods will not be executed at least until the next tick, even for promises that already have an outcome.

### Combining promises

- `Promise.all()` turns an array of promises into a promise of an array.
- If any promise is rejected, the error will pass through.
- `Promise.race()` passes throuh the first settled promise.

```js
Promise
  .all([ p1, p2, p3 ])
  .then(([ v1, v2, v3 ]) => {
    // Values always correspond to the order of promises,
    // not the order they resolved in (i.e. v1 corresponds to p1)
  });

Promise
  .race([ p1, p2, p3 ])
  .then(val => {
    // val will take the value of the first resolved promise
  });
```

### async/await

- Calling an `async` function always results in a promise.
- `(async () => value)()` will resolve to `value`.
- `(async () => throw err)()` will reject with an error.
- `await` waits for a promise to be fulfilled and returns its value.
- `await` can only be used in `async` functions.
- `await` also accepts non-promise values.
- `await` always waits at least until the next tick before resolving, even when waiting already fulfilled promises or non-promise values.

```js
async () => {
  try {
    let val = await promisedValue();
    // Do stuff here
  } catch (err) {
    // Handle error
  }
}
```

**Image credit:** [Katie Burkhart](https://unsplash.com/@katieanalyzes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
