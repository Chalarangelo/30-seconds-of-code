### Fibonacci array generator

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = n => {
  return Array(n)
    .fill(0)
    .reduce((acc, val, i) => {
      acc.push(i > 1 ? acc[i - 1] + acc[i - 2] : i);
      return acc;
    },[]);
}
// fibonacci(5) -> [0,1,1,2,3]
```
