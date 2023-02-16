---
title: Delay function execution
tags: function
cover: interior-13
firstSeen: 2018-01-24T14:32:20+02:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Invokes the provided function after `ms` milliseconds.

- Use `setTimeout()` to delay execution of `fn`.
- Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const delay = (fn, ms, ...args) => setTimeout(fn, ms, ...args);
```

```js
delay(
  function(text) {
    console.log(text);
  },
  1000,
  'later'
); // Logs 'later' after one second.
```
