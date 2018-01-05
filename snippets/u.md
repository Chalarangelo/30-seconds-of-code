### U

Returns function that applies to itself. 

U combinator allows us to use recursive anonymous function

[See more](https://en.wikipedia.org/wiki/Fixed-point_combinator) combinators and Lambda calculus. 

```js
const U = f => f(f)
```

```js
console.log(U(f => x => x === 0 ? 1 : x * U(f)(x - 1))(5)) // 120
```
