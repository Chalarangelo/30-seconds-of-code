### debounce

Creates a debounced function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

Use `setTimeout()` and `clearTimeout()` to debounce the given method, `fn`.
Use `Function.apply()` to apply the `this` context to the function and provide the necessary `arguments`.
Omit the second argument, `wait`, to set the timeout at a default of 0 ms.

```js
const debounce = (fn, wait = 0) => {
  let inDebounce;
  return function() {
    const context = this,
      args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn.apply(context, args), wait);
  };
};
```

```js
window.addEventListener(
  'resize',
  debounce(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```
