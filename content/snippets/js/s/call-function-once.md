---
title: Call a JavaScript function once
shortTitle: Call function once
language: javascript
tags: [function]
cover: pink-flower-tree
excerpt: Create a function that ensures another function is called only once.
listed: true
dateModified: 2024-07-26
---

Sometimes, you need to ensure that a function is **called only once**, regardless of how many times it is invoked. This can be useful in various scenarios, especially when dealing with side effects or event listeners.

Using a [**closure**](/js/s/closures) and a flag, you can create a function that ensures another function is called only once. The flag will be initially set to `false`, and once the function is called, it will be set to `true`, preventing the function from being called again.

In order to allow the function to have its [`this` context](/js/s/this) changed (such as in an event listener), the `function` keyword must be used, and the supplied function must have the **context applied** via `Function.prototype.apply()` or `Function.prototype.call()`.

Moreover, the function should be able to accept an **arbitrary number of arguments**, which can be achieved using the **rest operator**.

```js
const once = fn => {
  let called = false;

  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp));
// only runs `startApp` once upon click
```
