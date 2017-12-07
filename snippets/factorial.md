### Factorial

Create an array of length `n+1`, use `reduce()` to get the product of every value in the given range, utilizing the index of each element.

```js
var factorial = n =>
  Array.apply(null, [1].concat(Array(n))).reduce( (a, _, i) => a * i || 1 , 1);
```
