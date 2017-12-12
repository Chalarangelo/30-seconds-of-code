### Measure time taken by function

Use `performance.now()` to get start and end time for the function, `console.log()` the time taken.
First argument is the function name, subsequent arguments are passed to the function.

```js
const timeTaken = (func,...args) => {
  var t0 = performance.now(), r = func(...args);
  console.log(performance.now() - t0);
  return r;
}
// timeTaken(Math.pow, 2, 10) -> 1024 (0.010000000009313226 logged in console)
```
