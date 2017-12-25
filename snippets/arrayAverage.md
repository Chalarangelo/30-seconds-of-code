### arrayAverage

Returns the average of an array of numbers.

Use `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
```

```js
arrayAverage([1,2,3]) -> 2
```
