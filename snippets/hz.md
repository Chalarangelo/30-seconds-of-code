### hz

Returns the number of times a function executed per second. 
`hz` is the unit for `hertz`, the unit of frequency defined as one cycle per second.

Use `performance.now()` to get the difference in milliseconds before and after the iteration loop to calculate the time elapsed executing the function `iterations` times. 
Return the number of cycles per second by converting milliseconds to seconds and dividing it by the time elapsed. 
Omit the second argument, `iterations`, to use the default of 100 iterations.

```js
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  return 1000 * iterations / (performance.now() - before);
};
```

```js
// 10,000 element array
const numbers = Array(10000)
  .fill()
  .map((_, i) => i);

// Test functions with the same goal: sum up the elements in the array
const sumReduce = () => numbers.reduce((acc, n) => acc + n, 0);
const sumForLoop = () => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

// `sumForLoop` is nearly 10 times faster
Math.round(hz(sumReduce)); // 572
Math.round(hz(sumForLoop)); // 4784
```
