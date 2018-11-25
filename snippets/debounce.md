### debounce

Creates a debounced function that delays invoking the provided function until at least `ms` milliseconds have elapsed since the last time it was invoked.

Each time the debounced function is invoked, clear the current pending timeout with `clearTimeout()` and use `setTimeout()` to create a new timeout that delays invoking the function until at least `ms` milliseconds has elapsed. Use `Function.prototype.apply()` to apply the `this` context to the function and provide the necessary arguments.
Omit the second argument, `ms`, to set the timeout at a default of 0 ms.

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```

```js
window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```
