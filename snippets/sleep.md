---
title: Delay async function execution
tags: function,promise
expertise: intermediate
cover: blog_images/sleepy-cat.jpg
firstSeen: 2017-12-13T22:40:56+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Delays the execution of an asynchronous function.

- Delay executing part of an `async` function, by putting it to sleep, returning a `Promise`.

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
```

```js
async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
```
