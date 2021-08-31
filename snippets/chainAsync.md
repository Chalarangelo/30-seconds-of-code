---
title: chainAsync
tags: function,intermediate
firstSeen: 2017-12-17T17:55:51+02:00
lastElementUpdated: 2020-09-15T16:28:04+03:00
---

Chains asynchronous functions.

- Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = fns => {
  let currentElement = 0;
  const lastElement = fns[fns.length - 1];
  const next = () => {
    const fn = fns[currentElement++];
    fn === lastElement ? fn() : fn(next);
  };
  next();
};
```

```js
chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
    setTimeout(next, 1000);
  },
  () => {
    console.log('2 second');
  }
]);
```
