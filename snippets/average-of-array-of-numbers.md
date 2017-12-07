### Average of array of numbers

Use `reduce()` to add each value to an accumulator, initialized with a value of `0`, divide by the `length` of the array.

```js
var average = arr =>
  arr.reduce( (acc , val) => acc + val, 0) / arr.length;
```
