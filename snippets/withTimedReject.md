---
title: withTimedReject
tags: promise,intermediate
---

Use this to avoid waiting forever on a promise.

The given promise behaves as before, with this addition:

- Rejects if the given promise is slower than the given timeout.

The above is the actual only change in behavior.

These properties are unchanged:

- Resolves if the given promise resolves before the given timeout ends.
- Rejects if the given promise rejects.

NOTE: If you see warnings about unhandled promise rejection, remember that you always need to .catch on the line where you first define a promise, and not in any code line later on. This way you also can handle timeout differently from other errors.

To know if the promise rejected or if the timeout rejected, just catch on the given promise.

Need more features and complexity? Try https://github.com/sindresorhus/p-timeout

```js
const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const withTimedReject = (promise, milliseconds) =>
  Promise.race([promise, wait(milliseconds).then(() => Promise.reject())]);
```

```js
const fastPromise = wait(5)
  .then(() => "fast ok")
  .catch(() => "error");
await withTimedReject(fastPromise, 10).catch(() => "timeout"); // "fast ok"

const slowerPromise = wait(50)
  .then(() => "slow ok")
  .catch(() => "error");
await withTimedReject(slowerPromise, 10).catch(() => "timeout!"); // "timeout!"
```
