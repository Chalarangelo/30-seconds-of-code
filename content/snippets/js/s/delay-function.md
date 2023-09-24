---
title: Delay function execution
type: snippet
language: javascript
tags: [function]
cover: interior-13
dateModified: 2020-10-19
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
