### Measure time taken by function

Use `performance.now()` to get start and end time for the function, `console.log()` the time taken.
First argument is the function name, subsequent arguments are passed to the function.

```js
var timeTaken = (f,...args) => {
  var t0 = performance.now(), r = f(...args);
  console.log(performance.now() - t0);
  return r;
}
```
