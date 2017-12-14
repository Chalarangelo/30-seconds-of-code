### Compose functions

Use the `...rest` operator to gather all function arguments into an array. Return a function which takes
a single argument and uses `Array.reduceRight()` to return the result of applying each function.

```js
const compose = (...fns) => n => fns.reduceRight((acc, fn) => fn(acc), n);
/*
const addOne = n => n + 1;
const square = n => n * n;
const double = n => n * 2;
compose(addOne, square, double)(2) -> 17
equivalent to: addOne(square(double(2)))
*/
```
