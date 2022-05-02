---
title: Throttle function
tags: function
expertise: advanced
cover: blog_images/waves-from-above.jpg
firstSeen: 2018-01-28T15:23:01+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds

- Use `setTimeout()` and `clearTimeout()` to throttle the given method, `fn`.
- Use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary `arguments`.
- Use `Date.now()` to keep track of the last time the throttled function was invoked.
- Use a variable, `inThrottle`, to prevent a race condition between the first execution of `fn` and the next loop.
- Omit the second argument, `wait`, to set the timeout at a default of `0` ms.

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
```

```js
window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```
