### Measure time taken by function

Use `performance.now()` to get start and end time for the function, `console.log()` the time taken.
Pass a callback function as the argument.

```js
const timeTaken = callback => {
  const t0 = performance.now(), r = callback();
  console.log(performance.now() - t0);
  return r;
}
// timeTaken(() => Math.pow(2, 10)) -> 1024 (0.010000000009313226 logged in console)
```
