---
title: Call function once
type: snippet
language: javascript
tags: [function]
cover: pink-flower-tree
dateModified: 2020-10-21
---

Ensures a function is called only once.

- Utilizing a closure, use a flag, `called`, and set it to `true` once the function is called for the first time, preventing it from being called again.
- In order to allow the function to have its `this` context changed (such as in an event listener), the `function` keyword must be used, and the supplied function must have the context applied.
- Allow the function to be supplied with an arbitrary number of arguments using the rest/spread (`...`) operator.

```js
const once = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};
```

```js
const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp));
// only runs `startApp` once upon click
```
