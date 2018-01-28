### throttle

Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds

Use `setTimeout()` and `clearTimeout()` to throttle the given method, `fn`.
Use `Function.apply()` to apply the `this` context to the function and provide the necessary `arguments`.
Use `Date.now()` to keep track of the last time the throttled function was invoked.
Omit the second argument, `wait`, to set the timeout at a default of 0 ms.

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
      }, wait - (Date.now() - lastTime));
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
