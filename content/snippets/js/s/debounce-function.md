---
title: Debounce a JavaScript function
shortTitle: Debounce function
language: javascript
tags: [function]
cover: solitude-beach
excerpt: Create a debounced function that waits a certain amount of time before invoking the provided function again.
listed: true
dateModified: 2023-10-12
---

**Debouncing** is a technique used to **limit the number of times** a function is called. The function will only be called once, after a **specific amount of time** has elapsed since its last invocation.

To accomplish this, we can use **timeouts** to artificially create the necessary delay. Each time the debounced function is invoked, we need to **clear the current pending timeout** with `clearTimeout()`. Then, we must use `setTimeout()` to **create a new timeout** that delays invoking the function until at least `ms` milliseconds have elapsed. Finally, using `Function.prototype.apply()` we can apply the `this` context to the function and provide the necessary arguments.

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```
