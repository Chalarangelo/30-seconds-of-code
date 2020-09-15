---
title: delay
tags: function,intermediate
---

Invokes the provided function after `wait` milliseconds.

- Use `setTimeout()` to delay execution of `fn`.
- Use the spread (`...`) operator to supply the function with an arbitrary number of arguments.

```js
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);
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