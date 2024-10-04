---
title: Throttle a JavaScript function
shortTitle: Throttle function
language: javascript
tags: [function]
cover: beach-overview
excerpt: Create a throttled function that only invokes the provided function at most once per the specified interval.
listed: true
dateModified: 2024-07-23
---

**Throttling** is a technique used to **limit the number of times** a function is called. The function will only be called once, after a **specific amount of time** has elapsed since its last invocation.

To accomplish this, we can use **timeouts** to artificially create the necessary delay. Using `setTimeout()` and `clearTimeout()`, we can ensure that the function is only called once every `wait` milliseconds.

Using `Date.now()` to **keep track of the last time the throttled function was invoked**, we can compare the current time with the last time the function was called to determine if it should be invoked again. We also need to **prevent race conditions** between the first execution of the function and the next loop, so we use a variable, `inThrottle`, to handle this.

Finally, using `Function.prototype.apply()` we can apply the `this` context to the function and provide the necessary arguments.

```js
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;

  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```
