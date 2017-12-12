### Divisible by number

Using the module operator `%` we can check if the reminder is equal
to zero. In this case the function returns `true`. We can use this
function for checking if a number is even or odd passing 2 as `divisor`

```js
var isDivisible = (dividend, divisor) => dividend % divisor === 0;
```
