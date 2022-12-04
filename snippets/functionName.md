---
title: Get function name
tags: function
cover: blog_images/flower-portrait-5.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Logs the name of a function.

- Use `console.debug()` and the `name` property of the passed function to log the function's name to the `debug` channel of the console.
- Return the given function `fn`.

```js
const functionName = fn => (console.debug(fn.name), fn);
```

```js
let m = functionName(Math.max)(5, 6);
// max (logged in debug channel of console)
// m = 6
```
