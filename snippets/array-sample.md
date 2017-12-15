### Array sample

Use `Math.random()` to generate a random number, multiply it with `Array.length` and round it of to the nearest whole number using `Math.floor()`. Works with strings too. 

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// sample([3, 7, 9, 11]) -> 9 
```