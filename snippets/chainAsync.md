---
title: chainAsync
tags: function,intermediate
---

Chains asynchronous functions.

Loop through an array of functions containing asynchronous events, calling `next` when each asynchronous event has completed.

```js
const chainAsync = fns => {
  let curr = 0;
  ;(function next(){
    fns[curr++](next);
  })();
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