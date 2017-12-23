### spreadOver

Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.

Use closures and the spread operator (`...`) to map the array of arguments to the inputs of the function.

```js
const spreadOver = fn => argsArr => fn(...argsArr);
/*
const arrayMax = spreadOver(Math.max)
arrayMax([1,2,3]) // -> 3
arrayMax([1,2,4]) // -> 4
*/
```
