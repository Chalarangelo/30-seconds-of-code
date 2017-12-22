### Spread Over

Takes a veriadic function and returns a closure that accepts an array of arguments to map to the inputs of the functions

Explain briefly how the snippet works.

```js
const spreadOver = fn => argsArr =>
  fn(...argsArr)
/*
const arrayMax = spreadOver(Math.max)
arrayMax([1,2,3]) // -> 3
arrayMax([1,2,4]) // -> 4
*/
```