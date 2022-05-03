---
title: Call functions with context
tags: function
expertise: advanced
cover: blog_images/rabbit-call.jpg
firstSeen: 2017-12-22T21:54:30+02:00
lastUpdated: 2021-06-13T13:50:25+03:00
---

Given a key and a set of arguments, call them when given a context.

- Use a closure to call `key` with `args` for the given `context`.

```js
const call = (key, ...args) => context => context[key](...args);
```

```js
Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
```
