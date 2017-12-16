### Array sample

Use `Math.random()` to generate a random number, multiply it with `length` and round it of to the nearest whole number using `Math.floor()`.
This method also works with strings.

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
// sample([3, 7, 9, 11]) -> 9
```
