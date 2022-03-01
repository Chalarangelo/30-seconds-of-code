---
title: How can I add a timeout to a promise in JavaScript?
type: question
tags: javascript,promise,timeout,class
expertise: intermediate
author: chalarangelo
cover: blog_images/walking.jpg
excerpt: Oftentimes you might need to add a timeout to a promise in JavaScript. Learn how to do this and more in this short guide.
firstSeen: 2021-05-13T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Many times in the past I've found myself needing to add a timeout to a promise in JavaScript. `setTimeout()` is not exactly a perfect tool for the job, but it's easy enough to wrap it into a promise:

```js
const awaitTimeout = delay =>
  new Promise(resolve => setTimeout(resolve, delay));

awaitTimeout(300).then(() => console.log('Hi'));
// Logs 'Hi' after 300ms

const f = async () => {
  await awaitTimeout(300);
  console.log('Hi');  // Logs 'Hi' after 300ms
};
```

There's nothing particularly complicated about this code sample, really. All it does is use the `Promise` constructor to wrap `setTimeout()` and resolve the promise after `delay` ms. This can be a useful tool when some code has to stall for a given amount of time.

In order to add a timeout to another promise, however, there are two additional needs this utility has to satisfy. The first one is allowing the timeout promise to reject instead of resolving when provided a reason as a second argument. The other one is to create a wrapper function which will add the timeout to the promise:

```js
const awaitTimeout = (delay, reason) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (reason === undefined ? resolve() : reject(reason)),
      delay
    )
  );

const wrapPromise = (promise, delay, reason) =>
  Promise.race([promise, awaitTimeout(delay, reason)]);

wrapPromise(fetch('https://cool.api.io/data.json'), 3000, {
  reason: 'Fetch timeout',
})
  .then(data => {
    console.log(data.message);
  })
  .catch(data => console.log(`Failed with reason: ${data.reason}`));
// Will either log the `message` if `fetch` completes in under 3000ms
// or log an error message with the reason 'Fetch timeout' otherwise
```

As you can see in this example, `reason` is used to determine if the timeout promise will resolve or reject. `awaitTimeout()` is then used to create a new promise and passed to `Promise.race()` along with the other promise to create a timeout.

This implementation definitely works, but we can take it a couple steps further. An obvious improvement is the addition of a way to clear a timeout, which requires storing the ids of any active timeouts. This, along with the need to make this utility self-contained both make a great case for using a `class`:

```js
class Timeout {
  constructor() {
    this.ids = [];
  }

  set = (delay, reason) =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        if (reason === undefined) resolve();
        else reject(reason);
        this.clear(id);
      }, delay);
      this.ids.push(id);
    });

  wrap = (promise, delay, reason) =>
    Promise.race([promise, this.set(delay, reason)]);

  clear = (...ids) => {
    this.ids = this.ids.filter(id => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
  };
}

const myFunc = async () => {
  const timeout = new Timeout();
  const timeout2 = new Timeout();
  timeout.set(6000).then(() => console.log('Hello'));
  timeout2.set(4000).then(() => console.log('Hi'));
  timeout
    .wrap(fetch('https://cool.api.io/data.json'), 3000, {
      reason: 'Fetch timeout',
    })
    .then(data => {
      console.log(data.message);
    })
    .catch(data => console.log(`Failed with reason: ${data.reason}`))
    .finally(() => timeout.clear(...timeout.ids));
};
// Will either log the `message` or log a 'Fetch timeout' error after 3000ms
// The 6000ms timeout will be cleared before firing, so 'Hello' won't be logged
// The 4000ms timeout will not be cleared, so 'Hi' will be logged
```
